import React, { useState, useContext, useEffect } from "react";
import { Input, Button } from "reactstrap";
import { PuzzleContext } from "../../providers/PuzzleProvider";

const Search = () => {
    const { searchActivePuzzles, activePuzzles } = useContext(PuzzleContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortDesc, setSortDesc] = useState(true);

    const handleSearchField = (e) => {
        let searchInput = e.target
        let { name, value } = searchInput
        setSearchTerm(searchInput.value);
        setSortDesc(sortDesc);
        console.log(name, value)
    }

    const searchPuzzles = () => {
        searchActivePuzzles(searchTerm, sortDesc);
        setSearchTerm("");
    }

    return (
        <>
            <Input type="text" name="searchTerm" value={searchTerm} placeholder="Search Shared Puzzles" className="form-control searchBar" id="searchTerm" onChange={handleSearchField}> </Input>

            <Button className="submitSearch" type="button" color="success" onClick={searchPuzzles}>
                {'Search'}
            </Button>

        </>
    )
}
export default Search;