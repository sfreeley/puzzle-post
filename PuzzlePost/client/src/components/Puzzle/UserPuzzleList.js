import React, { useContext, useEffect } from "react";
import { PuzzleContext } from "../../providers/PuzzleProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Button } from "reactstrap"
import Puzzle from "./Puzzle";
import { Link } from "react-router-dom";
import InProgressList from "./InProgressList";

const UserPuzzleList = () => {
    const { userPuzzles, getAllPuzzlesByUser } = useContext(PuzzleContext);
    const { activeUser } = useContext(UserProfileContext);

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // useEffect(() => {
    //     sleep(300).then(() => {

    //         getAllInactivePuzzlesByUser(parseInt(activeUser.id));
    //     })
    // }, []);

    useEffect(() => {
        getAllPuzzlesByUser(parseInt(activeUser.id));
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <Link to={"/puzzle/add"}>New Puzzle</Link>

                <div className="cards-column">
                    {userPuzzles.length === 0 ? <h4>No puzzles currently being shared</h4> :
                        <>
                            <h5>Shared Active Puzzles</h5>
                            {userPuzzles.map((puzzle) => (
                                <Puzzle key={puzzle.id} puzzle={puzzle} />
                            ))}
                        </>
                    }
                </div>
                <InProgressList />

            </div>
        </div>
    );
};

export default UserPuzzleList;