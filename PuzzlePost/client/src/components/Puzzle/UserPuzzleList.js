import React, { useContext, useEffect } from "react";
import { PuzzleContext } from "../../providers/PuzzleProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Button } from "reactstrap"
import Puzzle from "./Puzzle";
import { NavLink } from "react-router-dom";

const UserPuzzleList = () => {
    const { inactiveUserPuzzles, userPuzzles, getAllPuzzlesByUser, getAllInactivePuzzlesByUser } = useContext(PuzzleContext);
    const { activeUser } = useContext(UserProfileContext);

    useEffect(() => {
        getAllPuzzlesByUser(parseInt(activeUser.id));
        getAllInactivePuzzlesByUser(parseInt(activeUser.id));
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <NavLink to={"/puzzle/add"}><Button>New Puzzle</Button></NavLink>
                <div className="cards-column">
                    <h5>Unavailable or In Progress Puzzles</h5>
                    {inactiveUserPuzzles.map((puzzle) => (
                        <Puzzle key={puzzle.id} puzzle={puzzle} />
                    ))}
                </div>
                <div className="cards-column">
                    <h5>Shared Active Puzzles</h5>
                    {userPuzzles.map((puzzle) => (
                        <Puzzle key={puzzle.id} puzzle={puzzle} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserPuzzleList;