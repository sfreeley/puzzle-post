using Microsoft.Extensions.Configuration;
using PuzzlePost.Models;
using PuzzlePost.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PuzzlePost.Repositories
{
    public class HistoryRepository : BaseRepository, IHistoryRepository
    {
        public HistoryRepository(IConfiguration config) : base(config) { }
        public void Add(History history)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO History (
                            PuzzleId, UserProfileId, StartDateOwnership, EndDateOwnership )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @PuzzleId, @UserProfileId, @StartDateOwnership, @EndDateOwnership)";
                    cmd.Parameters.AddWithValue("@PuzzleId", history.PuzzleId);
                    cmd.Parameters.AddWithValue("@UserProfileId", history.UserProfileId);
                    cmd.Parameters.AddWithValue("@StartDateOwnership", history.StartDateOwnership);
                    cmd.Parameters.AddWithValue("@EndDateOwnership", DbUtils.ValueOrDBNull(history.EndDateOwnership));

                    history.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        //get history by puzzleId and userprofileId
        public History GetHistoryByIds(int id, int puzzId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                      SELECT Id, PuzzleId, UserProfileId, StartDateOwnership, EndDateOwnership
                      FROM History
                      WHERE PuzzleId = @puzzleId AND UserProfileId = @id AND EndDateOwnership IS NULL
                       ";

                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.Parameters.AddWithValue("@puzzleId", puzzId);


                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        History history = new History
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            PuzzleId = reader.GetInt32(reader.GetOrdinal("PuzzleId")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            StartDateOwnership = reader.GetDateTime(reader.GetOrdinal("StartDateOwnership")),
                            EndDateOwnership = DbUtils.GetNullableDateTime(reader, "EndDateOwnership")   
                        };

                        reader.Close();
                        return history;
                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }

                }
            }
        }

        public void UpdateHistory(History history)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE History
                            SET  
                               EndDateOwnership = @endDateOwnership
                            WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@endDateOwnership", history.EndDateOwnership);
                    cmd.Parameters.AddWithValue("@id", history.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
