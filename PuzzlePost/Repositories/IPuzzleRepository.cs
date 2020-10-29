using PuzzlePost.Models;
using System.Collections.Generic;

namespace PuzzlePost.Repositories
{
    public interface IPuzzleRepository
    {
        List<Puzzle> GetAllSharedPuzzles();
        void Add(Puzzle puzzle);
        List<Category> GetAllCategories();
        List<Puzzle> GetAllUserPuzzlesById(int id);
        List<Puzzle> GetAllUserPuzzlesInProgressById(int id);
        Puzzle GetPuzzleById(int id);
        Puzzle GetPuzzleWithUserProfileById(int id);
        void UpdatePuzzle(Puzzle puzzle);
        void UpdatePuzzleOwner(Puzzle puzzle);
        Puzzle GetPuzzleWithoutHistoryById(int id);
        void ReactivatePuzzle(int id);
        void DeactivatePuzzle(int id);
        void DeletePuzzle(int id);
        List<Puzzle> SearchActivePuzzles(string criterion);
    }
}