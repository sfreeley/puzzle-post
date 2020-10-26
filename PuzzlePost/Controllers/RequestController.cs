using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
    }
}
