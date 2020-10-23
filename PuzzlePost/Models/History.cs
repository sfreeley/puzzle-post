using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PuzzlePost.Models
{
    public class History
    {
        public int Id { get; set; }
        public int PuzzleId { get; set; }
        public int UserProfileId { get; set; }
        public DateTime StartDateOwnership { get; set; }
        public DateTime EndDateOwnership { get; set; }
    }
}
