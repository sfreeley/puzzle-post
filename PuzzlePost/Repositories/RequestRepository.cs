﻿using Microsoft.Extensions.Configuration;
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

        //call for pending requests that need to be approved or denied by the user logged in
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
                       
                       up.Id AS UserId, up.DisplayName,

                       p.Id AS RequestedPuzzleId, p.Title, p.Manufacturer, p.Pieces, p.ImageLocation

                       FROM Request r
                       LEFT JOIN Status s
                       ON r.StatusId = s.Id   
                       LEFT JOIN UserProfile up
                       ON r.RequestingPuzzleUserId = up.Id
                       LEFT JOIN Puzzle p
                       ON r.PuzzleId = p.Id
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
                            },
                            Puzzle = new Puzzle()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("RequestedPuzzleId")),
                                Pieces = reader.GetInt32(reader.GetOrdinal("Pieces")),
                                Title = reader.GetString(reader.GetOrdinal("Title")),
                                Manufacturer = reader.GetString(reader.GetOrdinal("Manufacturer")),
                                ImageLocation = reader.GetString(reader.GetOrdinal("ImageLocation")),
                                
                            }
                        };

                        requests.Add(request);


                    }
                    reader.Close();
                    return requests;
                }
            }
        }

        //call for the requests being made by the user logged in to others
        public List<Request> GetOutgoingRequestsForUser(int id)
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
                       
                       up.Id AS UserId, up.DisplayName,

                       p.Id AS RequestedPuzzleId, p.Title, p.Manufacturer, p.Pieces

                       FROM Request r
                       LEFT JOIN Status s
                       ON r.StatusId = s.Id   
                       LEFT JOIN UserProfile up
                       ON r.RequestingPuzzleUserId = up.Id
                       LEFT JOIN Puzzle p
                       ON r.PuzzleId = p.Id
                       WHERE r.RequestingPuzzleUserId = @id
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
                            },
                            Puzzle = new Puzzle()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("RequestedPuzzleId")),
                                Pieces = reader.GetInt32(reader.GetOrdinal("Pieces")),
                                Title = reader.GetString(reader.GetOrdinal("Title")),
                                Manufacturer = reader.GetString(reader.GetOrdinal("Manufacturer")),
 
                            }
                        };

                        requests.Add(request);

                    }
                    reader.Close();
                    return requests;
                }
            }
        }

        //getting single Request by request id
        public Request GetRequestByPuzzleId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT r.Id AS RequestId, r.PuzzleId, r.RequestingPuzzleUserId, r.SenderOfPuzzleUserId, r.Content,
                       r.CreateDateTime, r.StatusId,
    
                       s.Id, s.Name
                       
                       FROM Request r
                       LEFT JOIN Status s
                       ON r.StatusId = s.Id
                       WHERE r.PuzzleId= @id AND s.Name = 'Pending' ";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
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
                            }
                        };
                        reader.Close();
                        return request;
                    }
                    else 
                    {
                        reader.Close();
                        return null;
                    }
                    
                }
            }
        }

        public void Add(Request request)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Request (PuzzleId, RequestingPuzzleUserId, SenderOfPuzzleUserId, Content, CreateDateTime, StatusId)
                        OUTPUT INSERTED.ID
                        VALUES (
                            @PuzzleId, @RequestingPuzzleUserId, @SenderOfPuzzleUserId, @Content, @CreateDateTime, @StatusId)";
                    cmd.Parameters.AddWithValue("@PuzzleId", request.PuzzleId);
                    cmd.Parameters.AddWithValue("@RequestingPuzzleUserId", request.RequestingPuzzleUserId);
                    cmd.Parameters.AddWithValue("@SenderOfPuzzleUserId", request.SenderOfPuzzleUserId);
                    cmd.Parameters.AddWithValue("@Content", request.Content);
                    cmd.Parameters.AddWithValue("@CreateDateTime", request.CreateDateTime);
                    cmd.Parameters.AddWithValue("@StatusId", 1);

                    request.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        //this will be used when current owner of puzzle confirms
        //to share with the person requesting the puzzle
        //the status of the request to id of 2 which is accepted (disappear from pending incoming requests)
        public void UpdateRequestStatus(Request request)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Request
                            SET  
                               StatusId = @statusId
                            WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@statusId", 2);
                    cmd.Parameters.AddWithValue("@id", request.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
