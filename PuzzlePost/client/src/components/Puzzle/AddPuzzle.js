import React, { useContext, useEffect, useState } from "react";
import { PuzzleContext } from "../../providers/PuzzleProvider";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useHistory } from "react-router-dom";

const AddPuzzle = () => {
    const userId = parseInt(sessionStorage.UserProfileId);
    const history = useHistory();
    const { categories, addPuzzle, categoriesForPuzzle } = useContext(PuzzleContext);
    const [isLoading, setIsLoading] = useState(false);
    // const [imageLocation, setImageLocation]
    // const [categorySelection, setCategorySelection] = useState(1)

    useEffect(() => {
        categoriesForPuzzle();
    }, [])
    //new puzzle that will be added into state
    const [newPuzzle, setNewPuzzle] = useState({
        categoryId: 1,
        // currentOwnerId: userId,
        imageLocation: "",
        pieces: "",
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

    const handleCategoryChange = (e) => {
        const stateToChange = { ...newPuzzle };
        stateToChange[e.target.id] = e.target.value;
        setNewPuzzle(stateToChange);

    };

    const addNewPuzzle = (e) => {
        e.preventDefault();
        // newPuzzle.categoryId = parseInt(categorySelection);
        setIsLoading(true);
        addPuzzle(newPuzzle);
        setIsLoading(false);
        //navigate the user back to shared puzzle list
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
                        value={newPuzzle.categoryId}
                        id="categoryId"
                        name="categoryId"

                    >
                        <option>Choose an option</option>
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