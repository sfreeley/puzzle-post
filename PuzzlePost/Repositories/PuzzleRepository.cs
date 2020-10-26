using Microsoft.Extensions.Configuration;
using PuzzlePost.Models;
using PuzzlePost.Utils;
using System;
using System.Buffers;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;

namespace PuzzlePost.Repositories
{
    public class PuzzleRepository : BaseRepository, IPuzzleRepository
    {
        public PuzzleRepository(IConfiguration config) : base(config) { }

        public List<Puzzle> GetAllSharedPuzzles()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                      SELECT p.Id AS PuzzleId, p.CategoryId, p.CurrentOwnerId AS CurrentOwnerId, p.ImageLocation, p.Pieces, p.CreateDateTime,
                      p.Title, p.Manufacturer, p.Notes, p.IsAvailable,

                      c.Id AS CategoryId, c.Name,
    
                      up.DisplayName, up.ImageLocation

                      FROM Puzzle p
                      LEFT JOIN Category c 
                      ON p.CategoryId = c.Id
                      LEFT JOIN UserProfile up
                      ON p.CurrentOwnerId = up.Id
                      WHERE p.IsAvailable = 1
                      ORDER BY CreateDateTime DESC
                       ";

                    var puzzles = new List<Puzzle>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Puzzle puzzle = new Puzzle
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("PuzzleId")),
                            CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                            CurrentOwnerId = reader.GetInt32(reader.GetOrdinal("CurrentOwnerId")),
                            ImageLocation = DbUtils.GetNullableString(reader, "ImageLocation"),
                            Pieces = reader.GetInt32(reader.GetOrdinal("Pieces")),
                            CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                            Title = reader.GetString(reader.GetOrdinal("Title")),
                            Manufacturer = reader.GetString(reader.GetOrdinal("Manufacturer")),
                            Notes = DbUtils.GetNullableString(reader, "Notes"),
                            IsAvailable = reader.GetInt32(reader.GetOrdinal("IsAvailable")),
                            Category = new Category
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                                Name = reader.GetString(reader.GetOrdinal("Name"))
                            },
                            UserProfile = new UserProfile
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("CurrentOwnerId")),
                                DisplayName = reader.GetString(reader.GetOrdinal("DisplayName"))
                            }
                        };

                        puzzles.Add(puzzle);
                    }
                    reader.Close();
                    return puzzles;
                }
            }
        }
        public void Add(Puzzle puzzle)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Puzzle (
                            CategoryId, CurrentOwnerId, ImageLocation, Pieces, CreateDateTime, Title,
                            Manufacturer, Notes, IsAvailable )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @CategoryId, @CurrentOwnerId, @ImageLocation, @Pieces, @CreateDateTime, @Title, @Manufacturer, @Notes,
                            @IsAvailable)";
                    cmd.Parameters.AddWithValue("@CategoryId", puzzle.CategoryId);
                    cmd.Parameters.AddWithValue("@CurrentOwnerId", puzzle.CurrentOwnerId);
                    cmd.Parameters.AddWithValue("@ImageLocation", puzzle.ImageLocation);
                    cmd.Parameters.AddWithValue("@Pieces", puzzle.Pieces);
                    cmd.Parameters.AddWithValue("@CreateDateTime", puzzle.CreateDateTime);
                    cmd.Parameters.AddWithValue("@Title", puzzle.Title);
                    cmd.Parameters.AddWithValue("@Manufacturer", puzzle.Manufacturer);
                    cmd.Parameters.AddWithValue("@Notes", DbUtils.ValueOrDBNull(puzzle.Notes));
                    cmd.Parameters.AddWithValue("@IsAvailable", 1);
  
                     puzzle.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public List<Category> GetAllCategories()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = 
                        @"SELECT Id, [Name]
                          FROM Category 
                          ORDER BY Name";

                    var reader = cmd.ExecuteReader();

                    var categories = new List<Category>();

                    while (reader.Read())
                    {
                        categories.Add(new Category()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name"))
                        });
                    }

                    reader.Close();
                    return categories;
                }
            }
        }

        public List<Puzzle> GetAllUserPuzzlesById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                      SELECT p.Id AS PuzzleId, p.CategoryId, p.CurrentOwnerId AS CurrentOwnerId, p.ImageLocation, p.Pieces, p.CreateDateTime,
                      p.Title, p.Manufacturer, p.Notes, p.IsAvailable,

                      c.Id AS CategoryId, c.Name,

                      h.Id AS HistoryId, h.UserProfileId AS HistoricalOwnerId, h.StartDateOwnership, h.EndDateOwnership,
    
                      up.Id AS UserId, up.DisplayName, up.ImageLocation

                      FROM Puzzle p
                      LEFT JOIN Category c 
                      ON p.CategoryId = c.Id
                      LEFT JOIN History h
                      ON h.PuzzleId = p.Id
                      JOIN UserProfile up
                      ON h.UserProfileId = up.Id
                      WHERE p.CurrentOwnerId = @id AND p.IsAvailable = 1
                      ORDER BY CreateDateTime DESC
                       ";

                    cmd.Parameters.AddWithValue("@id", id);
                    var puzzles = new List<Puzzle>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        var puzzleId = DbUtils.GetInt(reader, "PuzzleId");

                        var existingPuzzle = puzzles.FirstOrDefault(puzzle => puzzle.Id == puzzleId);

                        if (existingPuzzle == null)
                        {
                            existingPuzzle = new Puzzle()
                            {
                                Id = puzzleId,
                                CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                                CurrentOwnerId = reader.GetInt32(reader.GetOrdinal("CurrentOwnerId")),
                                ImageLocation = DbUtils.GetNullableString(reader, "ImageLocation"),
                                Pieces = reader.GetInt32(reader.GetOrdinal("Pieces")),
                                CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                                Title = reader.GetString(reader.GetOrdinal("Title")),
                                Manufacturer = reader.GetString(reader.GetOrdinal("Manufacturer")),
                                Notes = DbUtils.GetNullableString(reader, "Notes"),
                                IsAvailable = reader.GetInt32(reader.GetOrdinal("IsAvailable")),
                                Category = new Category
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                                    Name = reader.GetString(reader.GetOrdinal("Name"))
                                },
                                UserProfile = new UserProfile
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("CurrentOwnerId")),
                                    DisplayName = reader.GetString(reader.GetOrdinal("DisplayName"))
                                },
                                Histories = new List<History>()
                            };

                            puzzles.Add(existingPuzzle);
                        }
                       
                        if (DbUtils.IsNotDbNull(reader, "HistoryId"))
                        {
                            existingPuzzle.Histories.Add(new History()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("HistoryId")),
                                PuzzleId = puzzleId,
                                UserProfileId = reader.GetInt32(reader.GetOrdinal("HistoricalOwnerId")),
                                StartDateOwnership = reader.GetDateTime(reader.GetOrdinal("StartDateOwnership")),
                                EndDateOwnership = DbUtils.GetNullableDateTime(reader, "EndDateOwnership"),
                                UserProfile = new UserProfile
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("UserId")),
                                    DisplayName = reader.GetString(reader.GetOrdinal("DisplayName"))
                                }
                            });
                        }
                    }
                    
                    reader.Close();
                    return puzzles;
                }
            }
        }

        public List<Puzzle> GetAllUserPuzzlesInProgressById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                      SELECT p.Id AS PuzzleId, p.CategoryId, p.CurrentOwnerId AS CurrentOwnerId, p.ImageLocation, p.Pieces, p.CreateDateTime,
                      p.Title, p.Manufacturer, p.Notes, p.IsAvailable,

                      c.Id AS CategoryId, c.Name,
    
                      up.DisplayName, up.ImageLocation

                      FROM Puzzle p
                      LEFT JOIN Category c 
                      ON p.CategoryId = c.Id
                      LEFT JOIN UserProfile up
                      ON p.CurrentOwnerId = up.Id
                      WHERE p.CurrentOwnerId = @id AND p.IsAvailable = 0
                      ORDER BY CreateDateTime DESC
                       ";

                    cmd.Parameters.AddWithValue("@id", id);
                    var puzzles = new List<Puzzle>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Puzzle puzzle = new Puzzle
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("PuzzleId")),
                            CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                            CurrentOwnerId = reader.GetInt32(reader.GetOrdinal("CurrentOwnerId")),
                            ImageLocation = DbUtils.GetNullableString(reader, "ImageLocation"),
                            Pieces = reader.GetInt32(reader.GetOrdinal("Pieces")),
                            CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                            Title = reader.GetString(reader.GetOrdinal("Title")),
                            Manufacturer = reader.GetString(reader.GetOrdinal("Manufacturer")),
                            Notes = DbUtils.GetNullableString(reader, "Notes"),
                            IsAvailable = reader.GetInt32(reader.GetOrdinal("IsAvailable")),
                            Category = new Category
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                                Name = reader.GetString(reader.GetOrdinal("Name"))
                            },
                            UserProfile = new UserProfile
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("CurrentOwnerId")),
                                DisplayName = reader.GetString(reader.GetOrdinal("DisplayName"))
                            }
                        };

                        puzzles.Add(puzzle);
                    }
                    reader.Close();
                    return puzzles;
                }
            }
        }

        //getting puzzle without history
        public Puzzle GetPuzzleWithoutHistoryById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                      SELECT p.Id AS PuzzleId, p.CategoryId, p.CurrentOwnerId AS CurrentOwnerId, p.ImageLocation, p.Pieces, p.CreateDateTime,
                      p.Title, p.Manufacturer, p.Notes, p.IsAvailable,

                      c.Id AS CategoryId, c.Name
    
                      FROM Puzzle p
                      LEFT JOIN Category c 
                      ON p.CategoryId = c.Id
                      WHERE p.Id = @id 
                      ORDER BY CreateDateTime DESC
                       ";

                    cmd.Parameters.AddWithValue("@id", id);
                   

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        Puzzle puzzle = new Puzzle
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("PuzzleId")),
                            CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                            CurrentOwnerId = reader.GetInt32(reader.GetOrdinal("CurrentOwnerId")),
                            ImageLocation = DbUtils.GetNullableString(reader, "ImageLocation"),
                            Pieces = reader.GetInt32(reader.GetOrdinal("Pieces")),
                            CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                            Title = reader.GetString(reader.GetOrdinal("Title")),
                            Manufacturer = reader.GetString(reader.GetOrdinal("Manufacturer")),
                            Notes = DbUtils.GetNullableString(reader, "Notes"),
                            IsAvailable = reader.GetInt32(reader.GetOrdinal("IsAvailable")),
                            Category = new Category
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                                Name = reader.GetString(reader.GetOrdinal("Name"))
                            }
                        };
                        reader.Close();
                        return puzzle;

                    }
                    else 
                    {
                        reader.Close();
                        return null;
                    }
                 
                }
            }
        }

        public Puzzle GetPuzzleById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                      SELECT p.Id AS PuzzleId, p.CategoryId, p.CurrentOwnerId AS CurrentOwnerId, p.ImageLocation, p.Pieces, p.CreateDateTime,
                      p.Title, p.Manufacturer, p.Notes, p.IsAvailable,

                      c.Id AS CategoryId, c.Name,

                      h.Id AS HistoryId, h.UserProfileId AS HistoricalOwnerId, h.StartDateOwnership, h.EndDateOwnership,
    
                      up.Id as UserId, up.DisplayName, up.ImageLocation

                      FROM Puzzle p
                      LEFT JOIN Category c 
                      ON p.CategoryId = c.Id
                      LEFT JOIN History h
                      ON h.PuzzleId = p.Id
                      LEFT JOIN UserProfile up
                      ON h.UserProfileId = up.Id
                      WHERE p.Id = @id
                      ORDER BY CreateDateTime DESC
                       ";

                    cmd.Parameters.AddWithValue("@id", id);
                   
                    var reader = cmd.ExecuteReader();
                    Puzzle puzzle = null;

                    while (reader.Read())
                    {
                        if (puzzle == null)
                        {
                            puzzle = new Puzzle
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("PuzzleId")),
                                CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                                CurrentOwnerId = reader.GetInt32(reader.GetOrdinal("CurrentOwnerId")),
                                ImageLocation = DbUtils.GetNullableString(reader, "ImageLocation"),
                                Pieces = reader.GetInt32(reader.GetOrdinal("Pieces")),
                                CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                                Title = reader.GetString(reader.GetOrdinal("Title")),
                                Manufacturer = reader.GetString(reader.GetOrdinal("Manufacturer")),
                                Notes = DbUtils.GetNullableString(reader, "Notes"),
                                IsAvailable = reader.GetInt32(reader.GetOrdinal("IsAvailable")),
                                Category = new Category
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                                    Name = reader.GetString(reader.GetOrdinal("Name"))
                                },
                                UserProfile = new UserProfile
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("CurrentOwnerId")),
                                    DisplayName = reader.GetString(reader.GetOrdinal("DisplayName"))
                                },
                                Histories = new List<History>()
                            };
                        }


                        if (DbUtils.IsNotDbNull(reader, "HistoryId"))
                        {
                            puzzle.Histories.Add(new History()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("HistoryId")),
                                PuzzleId = reader.GetInt32(reader.GetOrdinal("PuzzleId")),
                                UserProfileId = reader.GetInt32(reader.GetOrdinal("HistoricalOwnerId")),
                                StartDateOwnership = reader.GetDateTime(reader.GetOrdinal("StartDateOwnership")),
                                EndDateOwnership = DbUtils.GetNullableDateTime(reader, "EndDateOwnership"),
                                UserProfile = new UserProfile
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("UserId")),
                                    DisplayName = reader.GetString(reader.GetOrdinal("DisplayName"))
                                }
                            });

                        }
    
                    }
                    reader.Close();
                    return puzzle;



                }
                  
            }
        }


        //owner of puzzle updating
        public void UpdatePuzzle(Puzzle puzzle)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Puzzle
                            SET  
                                CategoryId = @categoryId,
                                ImageLocation = @imageLocation,
                                Pieces = @pieces,
                                Title = @title,
                                Manufacturer = @manufacturer,
                                Notes = @notes
                            WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@categoryId", puzzle.CategoryId);
                    cmd.Parameters.AddWithValue("@imageLocation", puzzle.ImageLocation);
                    cmd.Parameters.AddWithValue("@pieces", puzzle.Pieces);
                    cmd.Parameters.AddWithValue("@title", puzzle.Title);
                    cmd.Parameters.AddWithValue("@manufacturer", puzzle.Manufacturer);
                    cmd.Parameters.AddWithValue("@notes", puzzle.Notes);
                    cmd.Parameters.AddWithValue("@id", puzzle.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        //call to reactivate a puzzle
        public void ReactivatePuzzle(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Puzzle
                            SET  
                               IsAvailable = @isAvailable
                            WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@isAvailable", 1);
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
 }


