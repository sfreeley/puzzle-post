import React, { useContext, useEffect, useState } from "react";
import { PuzzleContext } from "../../providers/PuzzleProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import Puzzle from "./Puzzle";
import { Button, Row, Col, CardDeck, Container } from "reactstrap";
import { Link } from "react-router-dom";
import Search from "./Search";
import Time from "../Time/Time";
import "./styles/PuzzleList.css";


const PuzzleList = () => {

    const { getAllActivePuzzles, activePuzzles } = useContext(PuzzleContext);


    useEffect(() => {
        getAllActivePuzzles();
    }, []);


    const clearSearchResults = () => {
        getAllActivePuzzles();
    }

    return (
        <div className="puzzleList">
            <Time />
            <Search clearSearchResults={clearSearchResults} />

            <div className="addNewPuzzle--link">
                {/* <Link to={"puzzle/add"}><Button>New Puzzle</Button></Link> */}
            </div>

            <CardDeck className="puzzleList--container">

                {activePuzzles.map((puzzle) => {
                    return <Puzzle key={puzzle.id} puzzle={puzzle} />
                })}

            </CardDeck>

        </div>

    )
}
export default PuzzleList;