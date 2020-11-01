import React, { useContext, useEffect } from "react";
import { PuzzleContext } from "../../providers/PuzzleProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import Puzzle from "./Puzzle";

const InProgressList = () => {
    const { inactiveUserPuzzles, getAllInactivePuzzlesByUser } = useContext(PuzzleContext);
    const { activeUser } = useContext(UserProfileContext);

    // function sleep(ms) {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    // }
    useEffect(() => {
        getAllInactivePuzzlesByUser(parseInt(activeUser.id));
    }, []);


    return (



        <>
            {inactiveUserPuzzles.map((puzzle) => (
                <Puzzle key={puzzle.id} puzzle={puzzle} />
            ))}
        </>


    )
}

export default InProgressList;