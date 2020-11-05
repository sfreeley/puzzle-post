import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const DeleteComment = ({ deleteAComment, modal, toggle, aComment }) => {

    return (
        <>
            <div>
                <Modal isOpen={modal} toggleDelete={toggle} className="deleteP">
                    <ModalHeader toggleDelete={toggle}>Please Confirm Delete</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete this comment?
                    </ModalBody>
                    <ModalFooter>
                        <Button id={aComment.id} color="primary" onClick={deleteAComment}>Delete</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>

        </>
    )

};

export default DeleteComment;