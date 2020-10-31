import React, { useContext, useEffect, useState } from "react";
import { PuzzleContext } from "../../providers/PuzzleProvider";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";

const EditPuzzle = () => {
    const { categories, categoriesForPuzzle, editPuzzle, aPuzzle, getPuzzleWithoutHistoryById, setActivePuzzles, activePuzzles } = useContext(PuzzleContext);
    const { id } = useParams();
    const history = useHistory();
    const [editingPuzzle, setEditingPuzzle] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        categoriesForPuzzle();
        getPuzzleWithoutHistoryById(parseInt(id));
    }, [])

    useEffect(() => {
        setEditingPuzzle(aPuzzle)
    }, [aPuzzle])

    const handleFieldChange = (e) => {
        const stateToChange = { ...editingPuzzle };
        stateToChange[e.target.id] = e.target.value;
        setEditingPuzzle(stateToChange);

    };

    const handleCategoryChange = (e) => {
        const stateToChange = { ...editingPuzzle };
        stateToChange[e.target.id] = e.target.value;
        setEditingPuzzle(stateToChange);
    };

    const editAPuzzle = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const editedPuzzle = {
            id: parseInt(id),
            categoryId: parseInt(editingPuzzle.categoryId),
            title: editingPuzzle.title,
            manufacturer: editingPuzzle.manufacturer,
            imageLocation: editingPuzzle.imageLocation,
            pieces: parseInt(editingPuzzle.pieces),
            notes: editingPuzzle.notes
        }

        editPuzzle(editedPuzzle);
        setActivePuzzles(activePuzzles);
        history.goBack();
    }

    return (

        <>
            <Form className="editForm">
                <FormGroup>
                    <Label className="puzzleTitleLabel">Title</Label>
                    <Input
                        className="editingPuzzle"
                        onChange={handleFieldChange}
                        type="text"
                        id="title"
                        value={editingPuzzle.title}
                        placeholder="Enter Title"
                    />
                </FormGroup>
                <FormGroup>
                    <Label className="ManufacturerLabel">Manufacturer</Label>
                    <Input
                        className="editingPuzzle"
                        onChange={handleFieldChange}
                        type="text"
                        id="manufacturer"
                        value={editingPuzzle.manufacturer}
                        placeholder="Enter Manufacturer"
                    />

                </FormGroup>
                <FormGroup>
                    <Label className="ImageLocationLabel">Image Url</Label>
                    <Input
                        className="editingPuzzle"
                        onChange={handleFieldChange}
                        type="text"
                        id="imageLocation"
                        value={editingPuzzle.imageLocation}
                        placeholder="Image Url"
                    />
                </FormGroup>

                <FormGroup>
                    <Label className="CategoryLabel" for="categoryId">
                        Puzzle Categories
                </Label>

                    <Input
                        type="select"
                        className="editingPuzzle"
                        onChange={handleCategoryChange}
                        value={parseInt(editingPuzzle.categoryId)}
                        id="categoryId"
                        name="categoryId"
                    >
                        <option value={1}>Please Choose an Option</option>
                        {categories.map(category => {
                            return category.id === 1 ? null :

                                <option key={category.id} value={category.id}>{category.name}</option>
                        }

                        )}

                    </Input>

                </FormGroup>
                <FormGroup>
                    <Label className="PiecesLabel">Pieces</Label>
                    <Input
                        className="editingPuzzle"
                        onChange={handleFieldChange}
                        type="number"
                        id="pieces"
                        value={editingPuzzle.pieces}
                        placeholder="Pieces"
                    />
                </FormGroup>
                <FormGroup>
                    <Label className="NotesLabel" htmlFor="notes">Notes</Label>
                    <Input
                        className="editingPuzzle"
                        onChange={handleFieldChange}
                        type="textarea"
                        id="notes"
                        value={editingPuzzle.notes}
                        placeholder="Notes"
                    />
                </FormGroup>
            </Form>

            <Button
                className="editButton"
                onClick={editAPuzzle}
                variant="custom"
                type="button"
            >
                Save Your Edit
        </Button>
        </>

    )

}
export default EditPuzzle;