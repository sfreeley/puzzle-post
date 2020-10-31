import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { PuzzleContext } from "../../providers/PuzzleProvider";

const DeletePuzzle = ({ toggleDelete, deleteModal, puzzle, deleteAPuzzle }) => {
    // const { deletePuzzle, setActivePuzzles, activePuzzles, setInactiveUserPuzzles, inactiveUserPuzzles, setUserPuzzles, userPuzzles } = useContext(PuzzleContext);
    // const history = useHistory();



    return (
        <>
            <div>
                <Modal isOpen={deleteModal} toggleDelete={toggleDelete} className="deletePuzzle">
                    <ModalHeader toggleDelete={toggleDelete}>Please Confirm Delete</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete this puzzle?
                    </ModalBody>
                    <ModalFooter>
                        <Button id={puzzle.id} color="primary" onClick={deleteAPuzzle}>Delete</Button>{' '}
                        <Button color="secondary" onClick={toggleDelete}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>

        </>
    )

};

export default DeletePuzzle;