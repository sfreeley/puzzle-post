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
    public class PuzzleController : ControllerBase
    {
        private readonly IPuzzleRepository _puzzleRepository;

        public PuzzleController(IPuzzleRepository puzzleRepository)
        {
            _puzzleRepository = puzzleRepository;
        }

        [HttpGet("active")]
        public IActionResult Get()
        {

            return Ok(_puzzleRepository.GetAllSharedPuzzles());
        }

    }
}
