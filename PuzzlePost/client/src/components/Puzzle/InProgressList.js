import React, { useContext, useEffect } from "react";
import { PuzzleContext } from "../../providers/PuzzleProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import Puzzle from "./Puzzle";

const InProgressList = () => {
    const { inactiveUserPuzzles, userPuzzles, getAllPuzzlesByUser, getAllInactivePuzzlesByUser } = useContext(PuzzleContext);
    const { activeUser } = useContext(UserProfileContext);

    // function sleep(ms) {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    // }
    useEffect(() => {

        getAllInactivePuzzlesByUser(parseInt(activeUser.id));

    }, []);


    return (
        <div className="cards-column">
            {inactiveUserPuzzles.length === 0 ? <h4>You're not working on any puzzles</h4> :
                <>
                    <h5>Your In Progress Puzzles</h5>
                    {inactiveUserPuzzles.map((puzzle) => (
                        <Puzzle key={puzzle.id} puzzle={puzzle} />
                    ))}
                </>
            }
        </div>
    )
}

export default InProgressList;