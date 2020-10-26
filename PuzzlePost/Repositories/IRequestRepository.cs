using PuzzlePost.Models;
using System.Collections.Generic;

namespace PuzzlePost.Repositories
{
    public interface IRequestRepository
    {
        List<Request> GetPendingRequestsForUser(int id);
        List<Request> GetOutgoingRequestsForUser(int id);
        void Add(Request request);
    }
}