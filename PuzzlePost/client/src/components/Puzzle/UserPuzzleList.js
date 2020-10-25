import React, { useContext, useEffect } from "react";
import { PuzzleContext } from "../../providers/PuzzleProvider";
import { Button } from "reactstrap"
import Puzzle from "./Puzzle";
import { NavLink } from "react-router-dom";

const UserPuzzleList = () => {
    const { inactiveUserPuzzles, userPuzzles, getAllPuzzlesByUser, getAllInactivePuzzlesByUser } = useContext(PuzzleContext);

    useEffect(() => {
        getAllPuzzlesByUser(2);
        getAllInactivePuzzlesByUser(2);
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <NavLink to={"/puzzle/add"}><Button>New Puzzle</Button></NavLink>
                <div className="cards-column">
                    <h5>In Progress Puzzles</h5>
                    {inactiveUserPuzzles.map((puzzle) => (
                        <Puzzle key={puzzle.id} puzzle={puzzle} />
                    ))}
                </div>
                <div className="cards-column">
                    <h5>Shared Puzzles</h5>
                    {userPuzzles.map((puzzle) => (
                        <Puzzle key={puzzle.id} puzzle={puzzle} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserPuzzleList;