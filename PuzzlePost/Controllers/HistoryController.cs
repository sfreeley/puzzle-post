using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PuzzlePost.Models;
using PuzzlePost.Repositories;

namespace PuzzlePost.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HistoryController : ControllerBase
    {
        private readonly IHistoryRepository _historyRepository;
        private readonly IPuzzleRepository _puzzleRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public HistoryController(IHistoryRepository historyRepository, IPuzzleRepository puzzleRepository, IUserProfileRepository userProfileRepository)
        {
            _puzzleRepository = puzzleRepository;
            _userProfileRepository = userProfileRepository;
            _historyRepository = historyRepository;
        }

        [HttpPost]
        public IActionResult Post(History history)
        {
            UserProfile userProfile = GetCurrentUserProfile();
            history.UserProfileId = userProfile.Id;
          
           
            _historyRepository.Add(history);

            return CreatedAtAction("Get", new { id = history.Id }, history);
        }

        //Firebase
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
