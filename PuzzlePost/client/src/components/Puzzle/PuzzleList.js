import React, { useContext, useEffect, useState } from "react";
import { PuzzleContext } from "../../providers/PuzzleProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import Puzzle from "./Puzzle";
import { Button, Row, Col, CardDeck, Container } from "reactstrap";
import { Link } from "react-router-dom";
import Search from "./Search";

import "./styles/PuzzleList.css";


const PuzzleList = () => {
    const { activeUser } = useContext(UserProfileContext);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleString())
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

            <div className="addNewPuzzle--link">
                {/* <Link to={"puzzle/add"}><Button>New Puzzle</Button></Link> */}
            </div>

            <CardDeck>

                {activePuzzles.map((puzzle) => {
                    return <Puzzle key={puzzle.id} puzzle={puzzle} />
                })}

            </CardDeck>

        </div>

    )
}
export default PuzzleList;