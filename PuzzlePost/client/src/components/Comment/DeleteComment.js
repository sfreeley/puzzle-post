import React, { useContext, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { CommentContext } from "../../providers/CommentProvider";

const DeleteComment = ({ modal, toggle, comment }) => {
    const { deleteComment, getAllCommentsForPuzzle } = useContext(CommentContext);

    useEffect(() => {
        getAllCommentsForPuzzle(comment.puzzleId);
    }, [])

    const deleteAComment = () => {
        deleteComment(comment.id);
        getAllCommentsForPuzzle(comment.puzzleId);
    }

    return (
        <>
            <div>
                <Modal isOpen={modal} toggleDelete={toggle} className="deleteP">
                    <ModalHeader toggleDelete={toggle}>Please Confirm Delete</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete this comment?
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

export default DeleteComment;