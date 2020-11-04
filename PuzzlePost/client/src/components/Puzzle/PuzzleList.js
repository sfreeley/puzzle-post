import React, { useContext, useEffect } from "react";
import { PuzzleContext } from "../../providers/PuzzleProvider";
import Puzzle from "./Puzzle";
import { CardDeck } from "reactstrap";
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

            <CardDeck className="puzzleList--container">

                {activePuzzles.map((puzzle) => {
                    return <Puzzle key={puzzle.id} puzzle={puzzle} />
                })}

            </CardDeck>

        </div>

    )
}
export default PuzzleList;