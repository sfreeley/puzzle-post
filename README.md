# puzzle-post

Inspired by exchanging puzzles with family members, this fullstack application allows multiple users to post puzzles they have completed and share them with others.

## Application Overview

- What are the features of the application?

  - Users can request puzzles from other users. If the current owner accepts the request then that puzzle will belong to the requester of the puzzle. Once that user is finished with the puzzle they have the ability to reactivate it and allow other users to request the puzzle.

  - Users can see a list of active puzzles currently being shared, a list of their own shared and in-progress puzzles, incoming requests for their puzzles and a puzzle request history specific to that user.

## Installation

1. In the terminal, git clone ```git@github.com:sfreeley/puzzle-post.git```
2. Open Visual Studio
3. Open SQL Server Object Explorer
4. Go to Solution Explorer
5. Click Folder icon and change it to 'Folder View'
5. From the SQL Folder click 01_Db_Create.sql
6. Click Run
7. Click 02_Seed_Data.sql to populate the database with pre-populated data (please note your users will have their own firebaseUserIds that will need to be changed in the database)
8. Click Run
9. Click Run PuzzlePost
10. Click the 'Register' button
11. If registration is successful, the application will take you to the homepage

## Application Walkthrough

The following link is a walkthrough regarding the main functionality of this application:
[PuzzlePost](https://www.loom.com/share/12920b7379b5467daae1ab484511a7be)

## Technologies Used

- C# with ASP.NET Core Web API
- JavaScript
- SQL Server Express
- React library
- Cloudinary
- Reactstrap
- CSS3

## Planning Links

1. [ERD](https://dbdiagram.io/d/5f8ce4603a78976d7b7821ee)

