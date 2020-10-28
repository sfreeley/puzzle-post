using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PuzzlePost.Models;
using PuzzlePost.Repositories;

namespace PuzzlePost.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PuzzleController : ControllerBase
    {
        private readonly IPuzzleRepository _puzzleRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IHistoryRepository _historyRepository;
        private readonly IRequestRepository _requestRepository;

        public PuzzleController(IPuzzleRepository puzzleRepository, IUserProfileRepository userProfileRepository, IHistoryRepository historyRepository, IRequestRepository requestRepository)
        {
            _puzzleRepository = puzzleRepository;
            _userProfileRepository = userProfileRepository;
            _historyRepository = historyRepository;
            _requestRepository = requestRepository;

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

        [HttpGet("getwithuserprofile/{id}")]
        public IActionResult GetWithUserProfile(int id)
        {
            Puzzle puzzle = _puzzleRepository.GetPuzzleWithUserProfileById(id);
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

        [HttpPut("deactivate/{id}")]
        public ActionResult Deactivate(int id)
        {
            
            _puzzleRepository.DeactivatePuzzle(id);
            
  
            return NoContent();
        }

        //used when current owner approves puzzle request
        [HttpPut("updatepuzzleowner/{id}")]
        public ActionResult UpdatePuzzleOwner(int id, Puzzle puzzle)
        {
            UserProfile userProfile = GetCurrentUserProfile();
            var userId = userProfile.Id;

            //if (userId != puzzle.CurrentOwnerId)
            //{
            //    return Unauthorized();
            //}

            //HISTORY UPDATE
            //get a history object via both userId (currently owner) and puzzle id where end date time is null
            History history = _historyRepository.GetHistoryByIds(userId, puzzle.Id);
            //give end date the current time
            history.EndDateOwnership = DateTime.Now;
            //then call method to update the history object to have end date of current time
            _historyRepository.UpdateHistory(history);

            //REQUEST UPDATE AND PUZZLE UPDATE
            //need to also change status of the request from pending to approved; get the request
            //by puzzleId where status is pending (there will only be 1..)
            Request request = _requestRepository.GetRequestByPuzzleId(puzzle.Id);
            //current owner id should change from sender of puzzle to requester of puzzle
            puzzle.CurrentOwnerId = request.RequestingPuzzleUserId;
            //need to also update create date time to current date when ownership switches
            puzzle.CreateDateTime = DateTime.Now;
            //update puzzle and after updating this puzzle, it should have new currentOwnerId
            _puzzleRepository.UpdatePuzzleOwner(puzzle);
           
            //update status to status id of 2 = approved
            _requestRepository.UpdateRequestStatus(request);
            
            
            //HISTORY POST
            //instanstiate a new history object
            History newHistory = new History();  
            newHistory.PuzzleId = puzzle.Id;
            //new current owner now
            newHistory.UserProfileId = puzzle.CurrentOwnerId;
            newHistory.StartDateOwnership = DateTime.Now;
            //add new history object that now contains the information for the new owner
            _historyRepository.Add(newHistory);
          
            return NoContent();
        }

        [HttpPut("delete/{id}")]
        public IActionResult SoftDelete(int id)
        {
            UserProfile userProfile = GetCurrentUserProfile();
            var userId = userProfile.Id;
            _puzzleRepository.DeletePuzzle(id);
            History history = _historyRepository.GetHistoryByIds(userId, id);
            history.EndDateOwnership = DateTime.Now;
            _historyRepository.UpdateHistory(history);
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
