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
                      p.Title, p.Manufacturer, p.Notes, p.IsAvailable, p.IsDeleted,

                      c.Id AS CategoryId, c.Name,
    
                      up.DisplayName, up.ImageLocation

                      FROM Puzzle p
                      LEFT JOIN Category c 
                      ON p.CategoryId = c.Id
                      LEFT JOIN UserProfile up
                      ON p.CurrentOwnerId = up.Id
                      WHERE p.IsAvailable = 1 AND p.IsDeleted = 0
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
                            IsDeleted = reader.GetInt32(reader.GetOrdinal("IsDeleted")),
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

        public List<Puzzle> SearchActivePuzzles(string criterion)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = @"
                      SELECT p.Id AS PuzzleId, p.CategoryId, p.CurrentOwnerId AS CurrentOwnerId, p.ImageLocation, p.Pieces, p.CreateDateTime,
                      p.Title, p.Manufacturer, p.Notes, p.IsAvailable, p.IsDeleted,

                      c.Id AS CategoryId, c.Name,
    
                      up.DisplayName, up.ImageLocation

                      FROM Puzzle p
                      LEFT JOIN Category c 
                      ON p.CategoryId = c.Id
                      LEFT JOIN UserProfile up
                      ON p.CurrentOwnerId = up.Id
                      WHERE p.IsAvailable = 1 AND p.IsDeleted = 0 
                      AND (p.Title LIKE @Criterion OR p.Pieces LIKE @Criterion OR up.DisplayName LIKE @Criterion OR p.Manufacturer LIKE @Criterion)
                      ORDER BY p.CreateDateTime DESC";
                   
                    cmd.CommandText = sql;
                    DbUtils.AddParameter(cmd, "@Criterion", $"%{criterion}%");
                    var reader = cmd.ExecuteReader();

                    var puzzles = new List<Puzzle>();
                    
                    while (reader.Read())
                    {

                        puzzles.Add(new Puzzle()
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
                            IsDeleted = reader.GetInt32(reader.GetOrdinal("IsDeleted")),
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
                        });
                             
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
                            Manufacturer, Notes, IsAvailable, IsDeleted )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @CategoryId, @CurrentOwnerId, @ImageLocation, @Pieces, @CreateDateTime, @Title, @Manufacturer, @Notes,
                            @IsAvailable, @IsDeleted)";
                    cmd.Parameters.AddWithValue("@CategoryId", puzzle.CategoryId);
                    cmd.Parameters.AddWithValue("@CurrentOwnerId", puzzle.CurrentOwnerId);
                    cmd.Parameters.AddWithValue("@ImageLocation", puzzle.ImageLocation);
                    cmd.Parameters.AddWithValue("@Pieces", puzzle.Pieces);
                    cmd.Parameters.AddWithValue("@CreateDateTime", puzzle.CreateDateTime);
                    cmd.Parameters.AddWithValue("@Title", puzzle.Title);
                    cmd.Parameters.AddWithValue("@Manufacturer", puzzle.Manufacturer);
                    cmd.Parameters.AddWithValue("@Notes", DbUtils.ValueOrDBNull(puzzle.Notes));
                    cmd.Parameters.AddWithValue("@IsAvailable", 1);
                    cmd.Parameters.AddWithValue("@IsDeleted", 0);
  
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

        //without history
        public List<Puzzle> GetAllUserPuzzlesById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                      SELECT p.Id AS PuzzleId, p.CategoryId, p.CurrentOwnerId AS CurrentOwnerId, p.ImageLocation, p.Pieces, p.CreateDateTime,
                      p.Title, p.Manufacturer, p.Notes, p.IsAvailable, p.IsDeleted,

                      c.Id AS CategoryId, c.Name,

                      up.Id AS UserId, up.DisplayName, up.ImageLocation

                      FROM Puzzle p
                      LEFT JOIN Category c 
                      ON p.CategoryId = c.Id
                      LEFT JOIN UserProfile up
                      ON p.CurrentOwnerId = up.Id
                      WHERE p.CurrentOwnerId = @id AND p.IsAvailable = 1 AND p.IsDeleted = 0
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
                                IsDeleted = reader.GetInt32(reader.GetOrdinal("IsDeleted")),
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
                                //Histories = new List<History>()
                            };

                            puzzles.Add(existingPuzzle);
                        }
                       
                        //if (DbUtils.IsNotDbNull(reader, "HistoryId"))
                        //{
                        //    existingPuzzle.Histories.Add(new History()
                        //    {
                        //        Id = reader.GetInt32(reader.GetOrdinal("HistoryId")),
                        //        PuzzleId = puzzleId,
                        //        UserProfileId = reader.GetInt32(reader.GetOrdinal("HistoricalOwnerId")),
                        //        StartDateOwnership = reader.GetDateTime(reader.GetOrdinal("StartDateOwnership")),
                        //        EndDateOwnership = DbUtils.GetNullableDateTime(reader, "EndDateOwnership"),
                        //        UserProfile = new UserProfile
                        //        {
                        //            Id = reader.GetInt32(reader.GetOrdinal("UserId")),
                        //            DisplayName = reader.GetString(reader.GetOrdinal("DisplayName"))
                        //        }
                        //    });
                        //}
                    }
                    
                    reader.Close();
                    return puzzles;
                }
            }
        }

        //getting the puzzles that the user will see in their puzzle list that are not currently 
        //being requested (not pending)
        public List<Puzzle> GetAllUserPuzzlesInProgressById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                     SELECT p.Id AS PuzzleId, p.CategoryId, p.CurrentOwnerId AS CurrentOwnerId, p.ImageLocation, p.Pieces, p.CreateDateTime,
                      p.Title, p.Manufacturer, p.Notes, p.IsAvailable, p.IsDeleted,

                      c.Id AS CategoryId, c.Name,
    
                      up.DisplayName, up.ImageLocation,

                      r.StatusId

                      FROM Puzzle p
                      LEFT JOIN Category c 
                      ON p.CategoryId = c.Id
                      LEFT JOIN UserProfile up
                      ON p.CurrentOwnerId = up.Id
                      LEFT JOIN Request r ON r.PuzzleId = p.Id
                      WHERE p.CurrentOwnerId = @id AND p.IsAvailable = 0 AND r.StatusId = 2 AND p.IsDeleted = 0
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
                            IsDeleted = reader.GetInt32(reader.GetOrdinal("IsDeleted")),
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
                      p.Title, p.Manufacturer, p.Notes, p.IsAvailable, p.IsDeleted,

                      c.Id AS CategoryId, c.Name
    
                      FROM Puzzle p
                      LEFT JOIN Category c 
                      ON p.CategoryId = c.Id
                      WHERE p.Id = @id AND p.IsDeleted = 0
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
                            IsDeleted = reader.GetInt32(reader.GetOrdinal("IsDeleted")),
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
                      p.Title, p.Manufacturer, p.Notes, p.IsAvailable, p.IsDeleted,

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
                      WHERE p.Id = @id AND p.IsDeleted = 0
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
                                IsDeleted = reader.GetInt32(reader.GetOrdinal("IsDeleted")),
                                Category = new Category
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                                    Name = reader.GetString(reader.GetOrdinal("Name"))
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

        public Puzzle GetPuzzleWithUserProfileById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                      SELECT p.Id AS PuzzleId, p.CategoryId, p.CurrentOwnerId AS CurrentOwnerId, p.ImageLocation, p.Pieces, p.CreateDateTime,
                      p.Title, p.Manufacturer, p.Notes, p.IsAvailable, p.IsDeleted,

                      c.Id AS CategoryId, c.Name,

                      up.Id as UserId, up.DisplayName, up.ImageLocation

                      FROM Puzzle p
                      LEFT JOIN Category c 
                      ON p.CategoryId = c.Id
                      LEFT JOIN UserProfile up
                      ON p.CurrentOwnerId = up.Id
                      WHERE p.Id = @id AND p.IsDeleted = 0
                      ORDER BY CreateDateTime DESC
                       ";

                    cmd.Parameters.AddWithValue("@id", id);

                    var reader = cmd.ExecuteReader();
                    Puzzle puzzle = null;

                    if (reader.Read())
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
                            IsDeleted = reader.GetInt32(reader.GetOrdinal("IsDeleted")),
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


        //owner of the puzzle able to edit
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
                    cmd.Parameters.AddWithValue("@Notes", DbUtils.ValueOrDBNull(puzzle.Notes));
                    cmd.Parameters.AddWithValue("@id", puzzle.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

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

        public void DeactivatePuzzle(int id)
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

                    cmd.Parameters.AddWithValue("@isAvailable", 0);
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeletePuzzle(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Puzzle
                            SET  
                               IsAvailable = @isAvailable,
                               IsDeleted = @isDeleted
                            WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@isAvailable", 0);
                    cmd.Parameters.AddWithValue("@isDeleted", 1);
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        //updating current owner id to who the puzzle is getting passed to
        public void UpdatePuzzleOwner(Puzzle puzzle)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Puzzle
                            SET  
                                CurrentOwnerId = @currentOwnerId,
                                CreateDateTime = @createDateTime
                            WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@currentOwnerId", puzzle.CurrentOwnerId);
                    cmd.Parameters.AddWithValue("@createDateTime", puzzle.CreateDateTime);
                    cmd.Parameters.AddWithValue("@id", puzzle.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
 }


