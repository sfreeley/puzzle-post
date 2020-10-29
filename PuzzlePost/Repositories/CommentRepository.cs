using Microsoft.Extensions.Configuration;
using PuzzlePost.Models;
using PuzzlePost.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PuzzlePost.Repositories
{
    public class CommentRepository : BaseRepository, ICommentRepository
    {
        public CommentRepository(IConfiguration config) : base(config) { }

        public List<Comment> GetAllCommentsByPuzzle(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                     SELECT c.Id, c.PuzzleId, c.UserProfileId, c.Title, c.Content, c.CreateDateTime,

                      p.Id AS PuzzleId, p.CategoryId, p.CurrentOwnerId, p.ImageLocation, p.Pieces, P.Title, p.ImageLocation, p.Manufacturer, p.Notes,
                      p.IsAvailable, p.IsDeleted,

                      ca.Id, ca.Name,

                      u.Id AS UserId, u.DisplayName

                      FROM Comment c
                      LEFT JOIN Puzzle p 
                      ON c.PuzzleId = p.Id
                      LEFT JOIN Category ca
                      ON p.CategoryId = ca.Id
                      LEFT JOIN UserProfile u
                      ON c.UserProfileId = u.Id
                      WHERE p.Id = @id AND p.IsAvailable = 1 AND p.IsDeleted = 0
                       ";

                    cmd.Parameters.AddWithValue("@id", id);

                    var comments = new List<Comment>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Comment comment = new Comment()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            PuzzleId = reader.GetInt32(reader.GetOrdinal("PuzzleId")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            Title = reader.GetString(reader.GetOrdinal("Title")),
                            Content = reader.GetString(reader.GetOrdinal("Content")),
                            CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                            Puzzle = new Puzzle
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
                            },
                            UserProfile = new UserProfile
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("UserId")),
                                DisplayName = reader.GetString(reader.GetOrdinal("DisplayName"))
                            }
                        };
                        comments.Add(comment);

                    }
                    reader.Close();
                    return comments;
                }
            }
        }

        public void AddComment(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Comment (PuzzleId, UserProfileId, Title, Content, CreateDateTime)
                                        OUTPUT INSERTED.ID
                                        VALUES (@puzzleId, @userProfileId, @title, @content, @createDateTime)";

                    cmd.Parameters.AddWithValue("@puzzleId", comment.PuzzleId);
                    cmd.Parameters.AddWithValue("@userProfileId", comment.UserProfileId);
                    cmd.Parameters.AddWithValue("@title", comment.Title);
                    cmd.Parameters.AddWithValue("@content", comment.Content);
                    cmd.Parameters.AddWithValue("@createDateTime", comment.CreateDateTime);
                    int id = (int)cmd.ExecuteScalar();

                    comment.Id = id;
                }
            }
        }

        public Comment GetCommentById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                      SELECT c.Id, c.PuzzleId, c.UserProfileId, c.Title, c.Content, c.CreateDateTime
                         FROM Comment c
                        WHERE c.Id = @id 
                       ";
                    cmd.Parameters.AddWithValue("@id", id);

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        Comment comment = new Comment
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            PuzzleId = reader.GetInt32(reader.GetOrdinal("PuzzleId")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            Title = reader.GetString(reader.GetOrdinal("Title")),
                            Content = reader.GetString(reader.GetOrdinal("Content")),
                            CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime"))
                        };

                        reader.Close();
                        return comment;
                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }
                }
            }
        }

        public void UpdateComment(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Comment
                            SET  
                                Title= @subject, 
                                Content = @Content
                            WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@subject", comment.Title);
                    cmd.Parameters.AddWithValue("@content", comment.Content);
                    cmd.Parameters.AddWithValue("@id", comment.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteComment(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                 DELETE FROM Comment
                                 WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();

                }
            }


        }
    }
}
