using PuzzlePost.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PuzzlePost.Repositories
{
    public interface IUserProfileRepository
    {
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        void Add(UserProfile userProfile);

    }
}
