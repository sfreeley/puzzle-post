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
    public class PuzzleController : ControllerBase
    {
        private readonly IPuzzleRepository _puzzleRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IHistoryRepository _historyRepository;

        public PuzzleController(IPuzzleRepository puzzleRepository, IUserProfileRepository userProfileRepository, IHistoryRepository historyRepository)
        {
            _puzzleRepository = puzzleRepository;
            _userProfileRepository = userProfileRepository;
            _historyRepository = historyRepository;
        }

        [HttpGet("active")]
        public IActionResult Get()
        {

            return Ok(_puzzleRepository.GetAllSharedPuzzles());
        }

        [HttpGet("history/{id}")]
        public IActionResult GetbyIdWithHistory(int id)
        {
            Puzzle puzzle = _puzzleRepository.GetPuzzleById(id);
            if (puzzle == null)
            {
                return null;
            }
            return Ok(puzzle);
        }

        [HttpGet("{id}")]
        public IActionResult GetbyIdWithoutHistory(int id)
        {
            Puzzle puzzle = _puzzleRepository.GetPuzzleWithoutHistoryById(id);
            if (puzzle == null)
            {
                return null;
            }
            return Ok(puzzle);
        }

        [HttpGet("category")]
        public IActionResult GetCategories()
        {

            return Ok(_puzzleRepository.GetAllCategories());

        }

        [HttpGet("user/{id}")]
        public IActionResult GetbyUser(int id)
        {

            return Ok(_puzzleRepository.GetAllUserPuzzlesById(id));
        }

        [HttpGet("user/inactive/{id}")]
        public IActionResult GetInactivePuzzlesByUser(int id)
        {
            return Ok(_puzzleRepository.GetAllUserPuzzlesInProgressById(id));
        }


        [HttpPost("puzzlewithhistory")]
        public IActionResult PostWithHistory(Puzzle puzzle)
        {
            UserProfile userProfile = GetCurrentUserProfile();
            puzzle.CurrentOwnerId = userProfile.Id;
            puzzle.CreateDateTime = DateTime.Now;
            _puzzleRepository.Add(puzzle);
            History history = new History();
            history.StartDateOwnership = DateTime.Now;
            history.PuzzleId = puzzle.Id;
            history.UserProfileId = userProfile.Id;
            _historyRepository.Add(history);
            return CreatedAtAction("Get", new { id = puzzle.Id }, puzzle);

        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Puzzle puzzle)
        {
            if (id != puzzle.Id)
            {
                return BadRequest();
            }
            _puzzleRepository.UpdatePuzzle(puzzle);
            return NoContent();
        }

        [HttpPut("reactivate/{id}")]
        public IActionResult Reactivate(int id)
        {
            _puzzleRepository.ReactivatePuzzle(id);
            return NoContent();

        }

        //Firebase
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

    }
}
