import React, { useContext, useEffect } from "react";
import { PuzzleContext } from "../../providers/PuzzleProvider";
import { Button } from "reactstrap"
import Puzzle from "./Puzzle";
import { NavLink } from "react-router-dom";

const UserPuzzleList = () => {
    const { userPuzzles, getAllPuzzlesByUser } = useContext(PuzzleContext);

    useEffect(() => {
        getAllPuzzlesByUser(2);
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <NavLink to={"puzzle/add"}><Button>New Puzzle</Button></NavLink>
                {/* will be another component that lists user puzzles not available */}
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