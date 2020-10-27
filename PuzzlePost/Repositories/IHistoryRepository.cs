using PuzzlePost.Models;

namespace PuzzlePost.Repositories
{
    public interface IHistoryRepository
    {
        void Add(History history);
        History GetHistoryByIds(int id, int puzzId);
        void UpdateHistory(History history);


    }
}