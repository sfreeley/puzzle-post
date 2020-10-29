using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PuzzlePost.Repositories;

namespace PuzzlePost.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IHistoryRepository _historyRepository;
        private readonly IRequestRepository _requestRepository;

        public CommentController(ICommentRepository commentRepository, IUserProfileRepository userProfileRepository, IHistoryRepository historyRepository, IRequestRepository requestRepository)
        {
            _commentRepository = commentRepository;
            _userProfileRepository = userProfileRepository;
            _historyRepository = historyRepository;
            _requestRepository = requestRepository;
        }

        //[HttpGet]
        //public IActionResult GetAllComments()
        //{
        //    return Ok(_commentRepository.GetAllComments());
        //}

        [HttpGet("getallcommentsbypuzzle/{id}")]
        public IActionResult GetAllCommentsByPost(int id)
        {
            return Ok(_commentRepository.GetAllCommentsByPuzzle(id));
        }

    }
}
