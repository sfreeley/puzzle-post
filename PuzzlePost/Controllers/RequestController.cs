﻿using System;
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
            request.RequestingPuzzleUserId = userId;
            if (userId != request.RequestingPuzzleUserId)
            {
                return Unauthorized();
            }
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

        //Firebase
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
