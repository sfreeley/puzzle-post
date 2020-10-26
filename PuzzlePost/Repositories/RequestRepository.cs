using Microsoft.Extensions.Configuration;
using PuzzlePost.Models;
using PuzzlePost.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PuzzlePost.Repositories
{
    public class RequestRepository : BaseRepository, IRequestRepository
    {
        public RequestRepository(IConfiguration config) : base(config) { }

        public List<Request> GetPendingRequestsForUser(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT r.Id AS RequestId, r.PuzzleId, r.RequestingPuzzleUserId, r.SenderOfPuzzleUserId, r.Content,
                       r.CreateDateTime, r.StatusId,
    
                       s.Id, s.Name,
                       
                       up.Id AS UserId, up.DisplayName

                       FROM Request r
                       LEFT JOIN Status s
                       ON r.StatusId = s.Id   
                       LEFT JOIN UserProfile up
                       ON r.RequestingPuzzleUserId = up.Id
                       WHERE r.SenderOfPuzzleUserId = @id AND s.Name = 'Pending'
                       ORDER BY r.CreateDateTime DESC";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    List<Request> requests = new List<Request>();

                    while (reader.Read())
                    {
                        Request request = new Request
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("RequestId")),
                            PuzzleId = reader.GetInt32(reader.GetOrdinal("PuzzleId")),
                            RequestingPuzzleUserId = reader.GetInt32(reader.GetOrdinal("RequestingPuzzleUserId")),
                            SenderOfPuzzleUserId = reader.GetInt32(reader.GetOrdinal("SenderOfPuzzleUserId")),
                            Content = DbUtils.GetNullableString(reader, "Content"),
                            CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                            StatusId = reader.GetInt32(reader.GetOrdinal("StatusId")),
                            Status = new Status()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("StatusId")),
                                Name = reader.GetString(reader.GetOrdinal("Name"))
                            },
                            UserProfile = new UserProfile()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("UserId")),
                                DisplayName = reader.GetString(reader.GetOrdinal("DisplayName"))
                            }
                        };

                        requests.Add(request);


                    }
                    reader.Close();
                    return requests;
                }
            }
        }
    }
}
