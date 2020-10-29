using PuzzlePost.Models;
using System.Collections.Generic;

namespace PuzzlePost.Repositories
{
    public interface ICommentRepository
    {
        //List<Comment> GetAllComments();
        List<Comment> GetAllCommentsByPuzzle(int id);
    }
}