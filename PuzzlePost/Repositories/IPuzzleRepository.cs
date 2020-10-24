using PuzzlePost.Models;
using System.Collections.Generic;

namespace PuzzlePost.Repositories
{
    public interface IPuzzleRepository
    {
        List<Puzzle> GetAllSharedPuzzles();
    }
}