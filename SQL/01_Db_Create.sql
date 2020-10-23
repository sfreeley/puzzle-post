USE [master]

IF db_id('PuzzlePost') IS NULL
  CREATE DATABASE [PuzzlePost]
GO

USE [PuzzlePost]
GO

DROP TABLE IF EXISTS [Puzzle];
DROP TABLE IF EXISTS [Category];
DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [Comment];
DROP TABLE IF EXISTS [Request];
DROP TABLE IF EXISTS [Status];
DROP TABLE IF EXISTS [History];
GO

CREATE TABLE [Category] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] NVARCHAR(200) NOT NULL
)

CREATE TABLE [UserProfile] (
  [Id] integer PRIMARY KEY IDENTITY,
  [DisplayName] NVARCHAR(100) NOT NULL,
  [Email] NVARCHAR(500) NOT NULL,
  [FirebaseUserId] NVARCHAR(28) NOT NULL,
  [ImageLocation] NVARCHAR(600),

CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
)

CREATE TABLE [Puzzle] (
  [Id] integer PRIMARY KEY IDENTITY,
  [CategoryId] integer NOT NULL,
  [CurrentOwnerId] integer NOT NULL,
  [ImageLocation] NVARCHAR(600) NOT NULL,
  [Pieces] integer NOT NULL,
  [CreateDateTime] datetime NOT NULL,
  [Title] NVARCHAR(400) NOT NULL,
  [Manufacturer] NVARCHAR(200) NOT NULL,
  [Notes] NVARCHAR(700),
  [IsAvailable] integer NOT NULL DEFAULT 1,

CONSTRAINT [FK_Puzzle_Category] FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id]),
CONSTRAINT [FK_Puzzle_UserProfile] FOREIGN KEY ([CurrentOwnerId]) REFERENCES [UserProfile] ([Id])
)


CREATE TABLE [Comment] (
  [Id] integer PRIMARY KEY IDENTITY,
  [PuzzleId] integer NOT NULL,
  [UserProfileId] integer NOT NULL,
  [Title] NVARCHAR(500) NOT NULL,
  [Content] NVARCHAR(700) NOT NULL,
  [CreateDateTime] datetime NOT NULL,

CONSTRAINT [FK_Comment_Puzzle] FOREIGN KEY ([PuzzleId]) REFERENCES [Puzzle] ([Id]),
CONSTRAINT [FK_Comment_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
)

CREATE TABLE [Status] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] NVARCHAR(100) NOT NULL
)

CREATE TABLE [Request] (
  [Id] integer PRIMARY KEY IDENTITY,
  [PuzzleId] integer NOT NULL,
  [RequestingPuzzleUserId] integer NOT NULL,
  [SenderOfPuzzleUserId] integer NOT NULL,
  [Content] NVARCHAR(700),
  [CreateDateTime] datetime NOT NULL,
  [StatusId] integer NOT NULL,

CONSTRAINT [FK_Request_Puzzle] FOREIGN KEY ([PuzzleId]) REFERENCES [Puzzle] ([Id]),
CONSTRAINT [FK_Request_UserProfile_Requesting] FOREIGN KEY ([RequestingPuzzleUserId]) REFERENCES [UserProfile] ([Id]),
CONSTRAINT [FK_Request_UserProfile_Sender] FOREIGN KEY ([SenderOfPuzzleUserId]) REFERENCES [UserProfile] ([Id]),
CONSTRAINT [FK_Request_Status] FOREIGN KEY ([StatusId]) REFERENCES [Status] ([Id])
)


CREATE TABLE [History] (
  [Id] integer PRIMARY KEY IDENTITY,
  [PuzzleId] integer NOT NULL,
  [UserProfileId] integer NOT NULL,
  [StartDateOwnership] datetime NOT NULL,
  [EndDateOwnership] datetime,

CONSTRAINT [FK_History_Puzzle] FOREIGN KEY ([PuzzleId]) REFERENCES [Puzzle] ([Id]),
CONSTRAINT [FK_History_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
)
GO


