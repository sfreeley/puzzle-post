using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PuzzlePost.Models
{
    public class Request
    {
        public int Id { get; set; }
        public int PuzzleId { get; set; }
        public int StatusId { get; set; }
        public int RequestingPuzzleUserId { get; set; }
        public int SenderOfPuzzleUserId { get; set; }

        public string Content { get; set; }
        public DateTime CreateDateTime { get; set; }
        public Status Status { get; set; }
        public UserProfile UserProfile { get; set; }
        public Puzzle Puzzle { get; set; }

    }
}
