import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";


const DeletePuzzle = ({ toggleDelete, deleteModal, puzzle, deleteAPuzzle }) => {

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