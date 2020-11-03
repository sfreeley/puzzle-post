using PuzzlePost.Models;
using System.Collections.Generic;

namespace PuzzlePost.Repositories
{
    public interface IRequestRepository
    {
        List<Request> GetPendingRequestsForUser(int id);
        List<Request> GetOutgoingRequestsForUser(int id);
        void Add(Request request);
        Request GetRequestById(int id);
        void UpdateRequestStatus(Request request);
        void UpdateToReject(Request request);
        Request GetRequestByPuzzleId(int id);
        void DeleteRequest(int id);

    }
}