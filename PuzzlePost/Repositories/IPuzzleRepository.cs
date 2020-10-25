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
        //Puzzle GetPuzzleById(int id);
    }
}