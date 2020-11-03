import React, { useContext, useEffect, useState } from "react";
import { PuzzleContext } from "../../providers/PuzzleProvider";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import "./styles/AddPuzzle.css";

const AddPuzzle = () => {
    const history = useHistory();
    const { categories, addPuzzle, categoriesForPuzzle } = useContext(PuzzleContext);
    const [isLoading, setIsLoading] = useState(false);

    const [newPuzzle, setNewPuzzle] = useState({
        categoryId: 1,
        imageLocation: "",
        pieces: null,
        title: "",
        manufacturer: "",
        notes: ""
    })

    useEffect(() => {
        categoriesForPuzzle();
    }, [])

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

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
        e.preventDefault();
        newPuzzle.categoryId = parseInt(newPuzzle.categoryId);
        newPuzzle.pieces = parseInt(newPuzzle.pieces);
        if (newPuzzle.title === "" || newPuzzle.manufacturer === "" || newPuzzle.imageLocation === "" || newPuzzle.pieces === "") {
            alert("Sorry, cannot leave these field(s) blank. Try again.");
        }
        else {
            setIsLoading(true);
            addPuzzle(newPuzzle);
            sleep(300).then(() => {
                history.push("/puzzle");
            })
        }

    }

    return (
        <div className="postForm--container">
            <div className="postFormSecondary--container">
                <Form className="postForm">
                    <FormGroup>
                        <Label className="puzzleTitleLabel"><strong>Title</strong></Label>
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
                        <Label className="ManufacturerLabel"><strong>Manufacturer</strong></Label>
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
                        <Label className="ImageLocationLabel"><strong>Image Url</strong></Label>
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
                        <Label className="CategoryLabel" for="categoryId">
                            <strong>Puzzle Categories</strong>
                        </Label>

                        <Input
                            type="select"
                            className="newPuzzle"
                            onChange={handleCategoryChange}
                            value={parseInt(newPuzzle.categoryId)}
                            id="categoryId"
                            name="categoryId"
                        >
                            <option className="newPuzzleCategory--option" value={1}>Please Choose an Option</option>
                            {categories.map(category => {
                                return category.id === 1 ? null :

                                    <option className="newPuzzleCategory--option" key={category.id} value={category.id}>{category.name}</option>
                            }

                            )}

                        </Input>

                    </FormGroup>
                    <FormGroup>
                        <Label className="PiecesLabel"> <strong>Pieces</strong></Label>
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
                        <Label className="NotesLabel"><strong>Notes</strong></Label>
                        <Input
                            className="newPuzzle"
                            onChange={handleFieldChange}
                            type="textarea"
                            id="notes"
                            value={newPuzzle.notes}
                            placeholder="Notes"
                        />
                    </FormGroup>
                    <Button
                        block
                        outline
                        className="postButton"
                        onClick={addNewPuzzle}
                        variant="custom"
                        type="button"
                    >
                        Save
            </Button>
                </Form>


            </div>
        </div>

    )

}
export default AddPuzzle;