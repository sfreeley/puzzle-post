using Microsoft.Extensions.Configuration;
using PuzzlePost.Models;
using PuzzlePost.Utils;
using System;
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
    }
}

