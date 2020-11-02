import React, { useContext, useEffect, useState } from "react";
import { PuzzleContext } from "../../providers/PuzzleProvider";
import Puzzle from "./Puzzle";
import { Button, Row, Col, CardDeck, Container } from "reactstrap";
import { Link } from "react-router-dom";
import Search from "./Search";
import DeletePuzzle from "./DeletePuzzle";
import "./styles/PuzzleList.css";


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
        <div className="puzzleList">
            <Search clearSearchResults={clearSearchResults} />
            {/* <div className="container"> */}
            {/* <div className="row justify-content-center"> */}
            {/* <Container> */}
            <div className="addNewPuzzle--link">
                {/* <Link to={"puzzle/add"}><Button>New Puzzle</Button></Link> */}
            </div>

            <CardDeck>

                {activePuzzles.map((puzzle) => {
                    return <Puzzle key={puzzle.id} puzzle={puzzle} />
                })}

            </CardDeck>
            {/* <DeletePuzzle /> */}

            {/* </Container> */}
            {/* </div> */}


        </div>

    )
}
export default PuzzleList;