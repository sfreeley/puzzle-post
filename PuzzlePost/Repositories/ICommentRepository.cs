using PuzzlePost.Models;
using System.Collections.Generic;

namespace PuzzlePost.Repositories
{
    public interface ICommentRepository
    {
        List<Comment> GetAllCommentsByPuzzle(int id);
        void AddComment(Comment comment);
        Comment GetCommentById(int id);
        void UpdateComment(Comment comment);
        void DeleteComment(int id);
    }
}