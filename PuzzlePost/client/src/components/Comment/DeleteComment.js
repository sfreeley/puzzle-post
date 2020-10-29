import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { PuzzleContext } from "../../providers/PuzzleProvider";
import { CommentContext } from "../../providers/CommentProvider";

const DeletePuzzle = ({ modal, toggle, comment }) => {
    const { deleteComment, getAllCommentsForPuzzle } = useContext(CommentContext);
    const history = useHistory();

    useEffect(() => {
        getAllCommentsForPuzzle(comment.puzzleId);
    }, [])
    const deleteAComment = () => {

        deleteComment(comment.id);
        getAllCommentsForPuzzle(comment.puzzleId)

    }

    return (
        <>
            <div>
                <Modal isOpen={modal} toggleDelete={toggle} className="deletePuzzle">
                    <ModalHeader toggleDelete={toggle}>Please Confirm Delete</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete this puzzle?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={deleteAComment}>Delete</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>

        </>
    )

};

export default DeletePuzzle;