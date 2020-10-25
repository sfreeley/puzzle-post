using PuzzlePost.Models;

namespace PuzzlePost.Repositories
{
    public interface IHistoryRepository
    {
        void Add(History history);
    }
}