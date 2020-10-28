import React, { useContext, useEffect, useState } from "react";
import { PuzzleContext } from "../../providers/PuzzleProvider";
import Puzzle from "./Puzzle";
import { Button } from "reactstrap";
import { NavLink } from "react-router-dom";

const PuzzleList = () => {
    const { getAllActivePuzzles, activePuzzles } = useContext(PuzzleContext);

    useEffect(() => {
        getAllActivePuzzles();
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <NavLink to={"puzzle/add"}><Button>New Puzzle</Button></NavLink>
                <div className="cards-column">
                    {activePuzzles.map((puzzle) => {
                        return <Puzzle key={puzzle.id} puzzle={puzzle} />
                    })}
                </div>
            </div>
        </div>


    )
}
export default PuzzleList;