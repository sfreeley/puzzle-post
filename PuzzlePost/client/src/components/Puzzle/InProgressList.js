import React, { useContext, useEffect } from "react";
import { PuzzleContext } from "../../providers/PuzzleProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import Puzzle from "./Puzzle";
import "./styles/InProgressList.css";

const InProgressList = () => {
    const { inactiveUserPuzzles, getAllInactivePuzzlesByUser } = useContext(PuzzleContext);
    const { activeUser } = useContext(UserProfileContext);


    useEffect(() => {
        getAllInactivePuzzlesByUser(parseInt(activeUser.id));
    }, []);


    return (

        <>
            {inactiveUserPuzzles.length === 0 ? <p className="noInProgress--alert">No puzzles in-progress</p> :
                inactiveUserPuzzles.map((puzzle) => (
                    <Puzzle key={puzzle.id} puzzle={puzzle} />
                ))
            }
        </>


    )
}

export default InProgressList;