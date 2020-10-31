import React, { useContext, useEffect, useState } from "react";
import { PuzzleContext } from "../../providers/PuzzleProvider";
import Puzzle from "./Puzzle";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import Search from "./Search";


const PuzzleList = () => {
    const { getAllActivePuzzles, activePuzzles } = useContext(PuzzleContext);

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect(() => {

        getAllActivePuzzles();


    }, []);



    const clearSearchResults = () => {
        getAllActivePuzzles();
    }



    return (
        <>
            <Search clearSearchResults={clearSearchResults} />
            <div className="container">
                <div className="row justify-content-center">
                    <Link to={"puzzle/add"}><Button>New Puzzle</Button></Link>
                    <div className="cards-column">
                        {activePuzzles.map((puzzle) => {
                            return <Puzzle key={puzzle.id} puzzle={puzzle} />
                        })}
                    </div>
                </div>
            </div>
        </>

    )
}
export default PuzzleList;