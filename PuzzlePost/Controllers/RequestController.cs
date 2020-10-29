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
    public class RequestController : ControllerBase
    {
        private readonly IRequestRepository _requestRepository;
        private readonly IPuzzleRepository _puzzleRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IHistoryRepository _historyRepository;

        public RequestController(IRequestRepository requestRepository, IPuzzleRepository puzzleRepository, IUserProfileRepository userProfileRepository, IHistoryRepository historyRepository)
        {
            _requestRepository = requestRepository;
            _puzzleRepository = puzzleRepository;
            _userProfileRepository = userProfileRepository;
            _historyRepository = historyRepository;
        }

        [HttpGet("{id}")]
        public IActionResult GetRequestById(int id)
        {

            return Ok(_requestRepository.GetRequestByPuzzleId(id));
        }

        [HttpGet("incoming/{id}")]
        public IActionResult GetIncomingRequests(int id)
        {

            return Ok(_requestRepository.GetPendingRequestsForUser(id));
        }

        [HttpGet("outgoing/{id}")]
        public IActionResult GetOutgoingRequests(int id)
        {

            return Ok(_requestRepository.GetOutgoingRequestsForUser(id));
        }

        [HttpPost("requestwithdeactivation")]
        public IActionResult PostRequestDeactivatePuzzle(Request request)
        {
            UserProfile userProfile = GetCurrentUserProfile();
            var userId = userProfile.Id;

            //if (userId != request.RequestingPuzzleUserId)
            //{
            //    return Unauthorized();
            //}
            request.RequestingPuzzleUserId = userId;
            request.CreateDateTime = DateTime.Now;
            //adding new request for the puzzle
            _requestRepository.Add(request);
            //new instance of puzzle
            Puzzle puzzle = new Puzzle();
            //need to specify id of puzzle to know which one to deactivate and take away from shared puzzle list
            puzzle.Id = request.PuzzleId;
            //deactivate puzzle and remove from shared puzzle list
            _puzzleRepository.DeactivatePuzzle(puzzle.Id);
            return Ok();
        }

        [HttpPost("rejection")]
        public IActionResult PostRejection(Request request)
        {
            UserProfile userProfile = GetCurrentUserProfile();
            var userId = userProfile.Id;

            //if (userId != request.SenderOfPuzzleUserId)
            //{
            //    return Unauthorized();
            //}
            request.SenderOfPuzzleUserId = userId;
            request.CreateDateTime = DateTime.Now;
            //adding new request for the puzzle
            _requestRepository.PostRejection(request);

            //get request by puzzle id where status is pending (request.puzzleId)
            Request aRequest = _requestRepository.GetRequestByPuzzleId(request.PuzzleId);
            //edit that request to statusid = 3 as well so can be removed from incoming requests page
            _requestRepository.UpdateToReject(aRequest);
            //new instance of puzzle
            Puzzle puzzle = new Puzzle();
            //need to specify id of puzzle to know which one to reactivate and send back shared puzzle list
            puzzle.Id = request.PuzzleId;
            //reactivate puzzle and remove from shared puzzle list
            _puzzleRepository.ReactivatePuzzle(puzzle.Id);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _requestRepository.DeleteRequest(id);
            //return status 204
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
