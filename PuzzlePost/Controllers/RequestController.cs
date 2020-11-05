﻿using System;
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
            //UserProfile userProfile = GetCurrentUserProfile();
            //var userId = userProfile.Id;
            //Puzzle puzzle = _puzzleRepository.GetPuzzleWithoutHistoryById(id);
            //if (userId != puzzle.CurrentOwnerId)
            //{
            //    return Unauthorized();
            //}

            return Ok(_requestRepository.GetRequestByPuzzleId(id));
        }

        [HttpGet("incoming/{id}")]
        public IActionResult GetIncomingRequests(int id)
        {
            //UserProfile userProfile = GetCurrentUserProfile();
            //var userId = userProfile.Id;

            //if (userId != id)
            //{
            //    return Unauthorized();
            //}

            return Ok(_requestRepository.GetPendingRequestsForUser(id));
        }

        [HttpGet("outgoing/{id}")]
        public IActionResult GetOutgoingRequests(int id)
        {
            //UserProfile userProfile = GetCurrentUserProfile();
            //var userId = userProfile.Id;

            //if (userId != id)
            //{
            //    return Unauthorized();
            //}

            return Ok(_requestRepository.GetOutgoingRequestsForUser(id));
        }


        [HttpPost("requestwithdeactivation")]
        public IActionResult PostRequestDeactivatePuzzle(Request request)
        {
            UserProfile userProfile = GetCurrentUserProfile();
            var userId = userProfile.Id;

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

        [HttpPut("rejection/{id}")]
        public IActionResult Reject(int id, Request request)
        {
            UserProfile userProfile = GetCurrentUserProfile();
            var userId = userProfile.Id;

            request.SenderOfPuzzleUserId = userId;
           
            request.CreateDateTime = DateTime.Now;

            //edit that request to statusid = 3 as well so can be removed from incoming requests page
            _requestRepository.UpdateToReject(request);
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
            //UserProfile userProfile = GetCurrentUserProfile();
            //var userId = userProfile.Id;
            //Puzzle puzzle = _puzzleRepository.GetPuzzleWithoutHistoryById(id);
            //if (userId != puzzle.CurrentOwnerId)
            //{
            //    return Unauthorized();
            //}
            //getting request by id where status is pending
            Request request = _requestRepository.GetRequestById(id);
            if (request == null) {
                //if there is no request by that id that is pending, just delete the request
                _requestRepository.DeleteRequest(id);
            }
            else {
                
                //if delete request and it was in pending status, have to reactivate the puzzle so goes back to shared puzzle list for someone else to request
                _puzzleRepository.ReactivatePuzzle(request.PuzzleId);
                //will remove from requesting history page and current owner's pending request page
                _requestRepository.DeleteRequest(id);
            }
          
            
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
