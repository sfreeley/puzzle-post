using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PuzzlePost.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public int PuzzleId { get; set; }
        public int UserProfileId { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }
        public DateTime CreateDateTime { get; set; }
        public Puzzle Puzzle { get; set; }
        public UserProfile UserProfile { get; set; }



    }
}
