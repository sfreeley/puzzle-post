import React, { useState, useContext, useEffect } from "react";
import { Input, Button } from "reactstrap";
import { PuzzleContext } from "../../providers/PuzzleProvider";

const Search = ({ clearSearchResults }) => {
    const { searchActivePuzzles } = useContext(PuzzleContext);
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
            <Input type="text" name="searchTerm" value={searchTerm} placeholder="Search Shared Puzzles" className="form-control searchBar" id="searchTerm" onChange={handleSearchField}> </Input>

            <Button className="submitSearch" type="button" color="success" onClick={searchPuzzles}>
                {'Search'}
            </Button>
            <Button className="clearSearch" type="button" color="warning" onClick={clearSearchResults}>
                {'Clear Results'}
            </Button>


        </>
    )
}
export default Search;