using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PuzzlePost.Models
{
    public class Puzzle
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public int CurrentOwnerId { get; set; }

        [Required]
        public string ImageLocation { get; set; }

        [Required]
        public int Pieces { get; set; }
        public DateTime CreateDateTime {get; set;}

        [Required]
        public string Title { get; set;}

        [Required]
        public string Manufacturer { get; set; }
        public string Notes { get; set; }
        public int IsAvailable { get; set; }
        public int IsDeleted { get; set; }
        public Category Category { get; set; }
        public UserProfile CurrentOwner { get; set; }
        public List<History> Histories { get; set; }

    }
}
