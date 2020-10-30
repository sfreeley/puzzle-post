using PuzzlePost.Models;
using System.Collections.Generic;

namespace PuzzlePost.Repositories
{
    public interface IRequestRepository
    {
        List<Request> GetPendingRequestsForUser(int id);
        List<Request> GetOutgoingRequestsForUser(int id);
        //List<Request> GetRejectedResponsesForUser(int id);
        void Add(Request request);
        //void PostRejection(Request request);
        void UpdateRequestStatus(Request request);
        void UpdateToReject(Request request);
        Request GetRequestByPuzzleId(int id);
        void DeleteRequest(int id);

    }
}