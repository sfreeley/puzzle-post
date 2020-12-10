import React, { useContext, useEffect, useState } from "react";
import { PuzzleContext } from "../../providers/PuzzleProvider";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import "./styles/EditPuzzle.css";

const EditPuzzle = () => {
    const { categories, categoriesForPuzzle, editPuzzle, aPuzzle, getPuzzleWithoutHistoryById } = useContext(PuzzleContext);
    const { id } = useParams();
    const history = useHistory();
    const [editingPuzzle, setEditingPuzzle] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [imageName, setImageName] = useState(" ");

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

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
        setIsLoading(false);
        sleep(300).then(() => {
            history.goBack();
        })

    };

    //cloudinary

    const checkUploadResult = (resultEvent) => {
        if (resultEvent.event === 'success') {

            editingPuzzle.imageLocation = resultEvent.info.secure_url
            setImageName(resultEvent.info.original_filename + `.${resultEvent.info.original_extension}`)

        }
    }
    const renderWidget = () => {
        let widget = window.cloudinary.createUploadWidget({
            cloudName: "digj43ynr",
            uploadPreset: "uploadPuzzles"
        },
            (error, result) => { checkUploadResult(result) })

        widget.open();
    }


    return (

        <div className="editForm--container">
            <div className="editFormSecondary--container">
                <Form className="editForm">
                    <FormGroup>
                        <Label className="puzzleTitleLabel"><strong>Title</strong></Label>
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
                        <Label className="ManufacturerLabel"><strong>Manufacturer</strong></Label>
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
                        <Button className="uploadPuzzleImage" outline onClick={renderWidget}>Upload Puzzle Image</Button> <p className="imageNameSizing">{imageName}</p>
                    </FormGroup>
                    <FormGroup>
                        <Label className="CategoryLabel" for="categoryId">
                            <strong>Puzzle Categories</strong>
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
                        <Label className="PiecesLabel"><strong>Pieces</strong></Label>
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
                        <Label className="NotesLabel" htmlFor="notes"><strong>Notes</strong></Label>
                        <Input
                            className="editingPuzzle"
                            onChange={handleFieldChange}
                            type="textarea"
                            id="notes"
                            value={editingPuzzle.notes}
                            placeholder="Notes"
                        />
                    </FormGroup>
                    <Button
                        className="editPuzzleForm--button"
                        block
                        onClick={editAPuzzle}
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
export default EditPuzzle;