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
            <div class="puzzleSearchContainer">
                <Input className="puzzleSearch" type="text" name="searchTerm" value={searchTerm} placeholder="Search Shared Puzzles" id="searchTerm" onChange={handleSearchField}> </Input>
                <div class="searchButtons">
                    <Button className="submitSearch" type="button" color="success" onClick={searchPuzzles}>
                        {'Search'}
                    </Button>
                    <Button className="clearSearch" type="button" color="warning" onClick={clearSearchResults}>
                        {'Clear Results'}
                    </Button>
                </div>
            </div>

        </>
    )
}
export default Search;