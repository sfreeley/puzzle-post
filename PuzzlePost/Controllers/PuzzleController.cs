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

        public PuzzleController(IPuzzleRepository puzzleRepository, IUserProfileRepository userProfileRepository)
        {
            _puzzleRepository = puzzleRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet("active")]
        public IActionResult Get()
        {

            return Ok(_puzzleRepository.GetAllSharedPuzzles());
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

        [HttpPost]
        public IActionResult Post(Puzzle puzzle)
        {
            UserProfile userProfile = GetCurrentUserProfile();
            puzzle.CurrentOwnerId = userProfile.Id;
            _puzzleRepository.Add(puzzle);

            return CreatedAtAction("Get", new { id = puzzle.Id }, puzzle);


        }

        //Firebase
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

    }
}
