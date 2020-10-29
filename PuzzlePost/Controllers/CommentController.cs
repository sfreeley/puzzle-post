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

        [HttpPost]
        public IActionResult Post(Comment comment)
        {
            UserProfile userProfile = GetCurrentUserProfile();
            comment.UserProfileId = userProfile.Id;
            comment.CreateDateTime = DateTime.Now;
            _commentRepository.AddComment(comment);
            //produces a status code of 201, which means userProfile object created sucessfully
            return Ok();

        }

        //this will show individual comment by commentid
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {

            Comment comment = _commentRepository.GetCommentById(id);
            if (comment == null)
            {
                return NotFound();
            }
            return Ok(comment);

        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Comment comment)
        {
            UserProfile userProfile = GetCurrentUserProfile();
            if (userProfile.Id != comment.UserProfileId || id != comment.Id) 
            {
                return BadRequest();
            }
           
            _commentRepository.UpdateComment(comment);
            return NoContent();
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _commentRepository.DeleteComment(id);
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
