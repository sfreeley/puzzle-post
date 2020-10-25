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
                    cmd.Parameters.AddWithValue("@CategoryId", history.PuzzleId);
                    cmd.Parameters.AddWithValue("@CurrentOwnerId", history.UserProfileId);
                    cmd.Parameters.AddWithValue("@ImageLocation", DateTime.Now);
                    cmd.Parameters.AddWithValue("@Pieces", DbUtils.ValueOrDBNull(history.EndDateOwnership));

                    history.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
