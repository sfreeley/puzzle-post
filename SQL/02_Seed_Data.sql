USE [PuzzlePost];
GO

--UserProfile
set identity_insert [UserProfile] on
insert into UserProfile (Id, DisplayName, Email, ImageLocation, FirebaseUserId) values (1, 'puzzlover', 'puzzlover@abc.com', 'https://images.unsplash.com/photo-1537815749002-de6a533c64db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3388&q=80', 'JfR2ZJ5T20YTq9OJ5LBDI1Lcsi83');
insert into UserProfile (Id, DisplayName, Email, ImageLocation, FirebaseUserId) values (2, 'puzzlemaniac', 'puzzler@puzzler.com', 'https://images.freeimages.com/images/large-previews/971/basic-shape-avatar-1632968.jpg', 'aqWpbVwZYIVJ9QTGP0licTDstUX2');
insert into UserProfile (Id, DisplayName, Email, ImageLocation, FirebaseUserId) values (3, 'cornerpiece123', 'jigster@bcd.com', 'https://images.unsplash.com/photo-1536164261511-3a17e671d380?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=930&q=80', '6B7phY5s5ogt1gkGeqDvKgtrESf2')
set identity_insert [UserProfile] off

--Status
set identity_insert [Status] on
insert into [Status] ([Id], [Name]) values (1, 'Pending');
insert into [Status] ([Id], [Name]) values (2, 'Accepted'); 
insert into [Status] ([Id], [Name]) values (3, 'Rejected')
set identity_insert [Status] off

--Category
set identity_insert [Category] on
insert into [Category] ([Id], [Name]) 
values (1, 'Panoramic'), (2, 'Landmarks'), (3, '3D'), (4, 'Children''s puzzles'), (5, 'Animals'),
	   (6, 'Art'), (7, 'Holiday'), (8, 'Fantasy'), (9, 'Miscellaneous')
set identity_insert [Category] off

--Puzzle
set identity_insert [Puzzle] on
insert into [Puzzle] ([Id], [CategoryId], [CurrentOwnerId], [ImageLocation], [Pieces], [CreateDateTime], [Title], [Manufacturer], [Notes], [IsAvailable]) 
values (1, 6, 2, 'https://cfcdn.zulily.com/images/cache/product/1000x1201/287979/zu55084083_main_tm1518547154.jpg', 1000, '2019-04-05', 'Starry Night', 'Eurographics', NULL, 1);

insert into [Puzzle] ([Id], [CategoryId], [CurrentOwnerId], [ImageLocation], [Pieces], [CreateDateTime], [Title], [Manufacturer], [Notes], [IsAvailable]) 
values (2, 7, 2, 'https://cfcdn.zulily.com/images/cache/product/1000x1201/222623/zu46537944_main_tm1490109464.jpg', 1000, '2019-12-05', 'Christmas Country Home', 'Springbok', NULL, 1);

insert into [Puzzle] ([Id], [CategoryId], [CurrentOwnerId], [ImageLocation], [Pieces], [CreateDateTime], [Title], [Manufacturer], [Notes], [IsAvailable]) 
values (3, 2, 3, 'https://cfcdn.zulily.com/images/cache/product/1000x1201/161752/zu35913747_main_tm1455132202.jpg', 1000, '2020-04-15', 'Times Square', 'Masterpieces', NULL, 1);
set identity_insert [Puzzle] off

--Comment
set identity_insert [Comment] on
insert into [Comment] ([Id], [PuzzleId], [UserProfileId], [Title], [Content], CreateDateTime) values (1, 1, 3, 'Sed sagittis.', 'Yasssss','2020-07-19');
insert into [Comment] ([Id], [PuzzleId], [UserProfileId], [Title], [Content], CreateDateTime) values (2, 1, 1, 'yo yo yo.', 'nom nom nom', '2020-09-10');
set identity_insert [Comment] off


--Request
set identity_insert [Request] on
insert into [Request] ([Id], [PuzzleId], [RequestingPuzzleUserId], [SenderOfPuzzleUserId], [Content], [CreateDateTime], [StatusId]) 
values (1, 1, 1, 2, 'Hey, love Starry Night', '2020-10-15', 1);
insert into [Request] ([Id], [PuzzleId], [RequestingPuzzleUserId], [SenderOfPuzzleUserId], [Content], [CreateDateTime], [StatusId]) 
values (2, 2, 3, 2, 'Yassss', '2020-10-23', 1);

set identity_insert [Request] off

--History
set identity_insert [History] on
insert into [History] ([Id], [PuzzleId], [UserProfileId], [StartDateOwnership], [EndDateOwnership]) values (1, 1, 3, '2019-04-05', '2019-07-17' );
insert into [History] ([Id], [PuzzleId], [UserProfileId], [StartDateOwnership], [EndDateOwnership]) values (2, 1, 1, '2019-07-17', '2020-02-14' );
insert into [History] ([Id], [PuzzleId], [UserProfileId], [StartDateOwnership], [EndDateOwnership]) values (3, 1, 2, '2020-02-14', NULL );

insert into [History] ([Id], [PuzzleId], [UserProfileId], [StartDateOwnership], [EndDateOwnership]) values (4, 2, 1, '2019-12-05', '2020-01-01' );
insert into [History] ([Id], [PuzzleId], [UserProfileId], [StartDateOwnership], [EndDateOwnership]) values (5, 2, 3, '2020-01-01', '2020-03-25' );
insert into [History] ([Id], [PuzzleId], [UserProfileId], [StartDateOwnership], [EndDateOwnership]) values (6, 2, 2, '2020-03-25', NULL );

insert into [History] ([Id], [PuzzleId], [UserProfileId], [StartDateOwnership], [EndDateOwnership]) values (7, 3, 1, '2020-04-15', '2020-06-04' );
insert into [History] ([Id], [PuzzleId], [UserProfileId], [StartDateOwnership], [EndDateOwnership]) values (8, 3, 2, '2020-06-04', '2020-08-26' );
insert into [History] ([Id], [PuzzleId], [UserProfileId], [StartDateOwnership], [EndDateOwnership]) values (9, 3, 3, '2020-08-26', NULL )
set identity_insert [History] off