import React, { useState, useContext, useEffect } from "react";
import { Input, Button } from "reactstrap";
import { PuzzleContext } from "../../providers/PuzzleProvider";
import "./styles/Search.css";
const Search = ({ clearSearchResults }) => {
    const { searchActivePuzzles, activePuzzles } = useContext(PuzzleContext);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchField = (e) => {
        let searchInput = e.target
        let { name, value } = searchInput
        setSearchTerm(searchInput.value);
        console.log(name, value)
    }

    const searchPuzzles = () => {
        searchActivePuzzles(searchTerm);
        setSearchTerm("");
    }

    return (
        <>
            <div className="puzzleSearchContainer">
                <Input className="puzzleSearch" type="text" name="searchTerm" value={searchTerm} placeholder="Search Shared Puzzles" id="searchTerm" onChange={handleSearchField}> </Input>
                <div className="searchButtons">
                    <Button className="submitSearch" type="button" outline onClick={searchPuzzles}>
                        {'Search'}
                    </Button>
                    <Button className="clearSearch" type="button" outline onClick={clearSearchResults}>
                        {'Clear Results'}
                    </Button>
                </div>
            </div>

        </>
    )
}
export default Search;