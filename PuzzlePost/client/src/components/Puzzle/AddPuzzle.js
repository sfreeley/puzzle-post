import React, { useContext, useEffect, useState } from "react";
import { PuzzleContext } from "../../providers/PuzzleProvider";
import { HistoryContext } from "../../providers/HistoryProvider";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useHistory } from "react-router-dom";

const AddPuzzle = () => {
    const history = useHistory();
    const { categories, addPuzzle, categoriesForPuzzle } = useContext(PuzzleContext);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        categoriesForPuzzle();

    }, [])

    //new puzzle that will be added into state
    const [newPuzzle, setNewPuzzle] = useState({
        categoryId: 1,
        //handling currentOwnerId in backend
        // currentOwnerId: userId,
        imageLocation: "",
        pieces: null,
        title: "",
        manufacturer: "",
        notes: ""
    })


    //handling input field for posting new puzzle
    const handleFieldChange = (e) => {
        const stateToChange = { ...newPuzzle };
        stateToChange[e.target.id] = e.target.value;
        setNewPuzzle(stateToChange);
    };

    //handling dropdown puzzle category state
    const handleCategoryChange = (e) => {
        const stateToChange = { ...newPuzzle };
        stateToChange[e.target.id] = e.target.value;
        setNewPuzzle(stateToChange);

    };

    const addNewPuzzle = (e) => {
        debugger;
        e.preventDefault();
        newPuzzle.categoryId = parseInt(newPuzzle.categoryId);
        newPuzzle.pieces = parseInt(newPuzzle.pieces);
        setIsLoading(true);
        addPuzzle(newPuzzle);
        setIsLoading(false);
        history.push("/puzzle");

    }

    return (
        <>
            <Form className="postForm">
                <FormGroup>
                    <Label className="puzzleTitleLabel">Title</Label>
                    <Input
                        className="newPuzzle"
                        onChange={handleFieldChange}
                        type="text"
                        id="title"
                        value={newPuzzle.title}
                        placeholder="Enter Title"
                    />
                </FormGroup>
                <FormGroup>
                    <Label className="ManufacturerLabel">Manufacturer</Label>
                    <Input
                        className="newPuzzle"
                        onChange={handleFieldChange}
                        type="text"
                        id="manufacturer"
                        value={newPuzzle.manufacturer}
                        placeholder="Enter Manufacturer"
                    />

                </FormGroup>
                <FormGroup>
                    <Label className="ImageLocationLabel">Image Url</Label>
                    <Input
                        className="newPuzzle"
                        onChange={handleFieldChange}
                        type="text"
                        id="imageLocation"
                        value={newPuzzle.imageLocation}
                        placeholder="Image Url"
                    />
                </FormGroup>

                <FormGroup>
                    <Label className="CategoryLabel">
                        Puzzle Categories
          </Label>

                    <Input
                        type="select"
                        className="newPuzzle"
                        onChange={handleCategoryChange}
                        value={parseInt(newPuzzle.categoryId)}
                        id="categoryId"
                        name="categoryId"

                    >
                        <option value={1}>Choose an option</option>
                        {categories.map(category => {

                            return <option key={category.id} value={category.id}>{category.name}</option>
                        }

                        )}

                    </Input>

                </FormGroup>
                <FormGroup>
                    <Label className="PiecesLabel">Pieces</Label>
                    <Input
                        className="newPuzzle"
                        onChange={handleFieldChange}
                        type="number"
                        id="pieces"
                        value={newPuzzle.pieces}
                        placeholder="Pieces"
                    />
                </FormGroup>
                <FormGroup>
                    <Label className="NotesLabel">Notes</Label>
                    <Input
                        className="newPuzzle"
                        onChange={handleFieldChange}
                        type="textarea"
                        id="notes"
                        value={newPuzzle.notes}
                        placeholder="Notes"
                    />
                </FormGroup>
            </Form>

            <Button
                className="postButton"
                onClick={addNewPuzzle}
                variant="custom"
                type="button"
            >
                Save Puzzle
            </Button>
        </>

    )

}
export default AddPuzzle;