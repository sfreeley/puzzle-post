import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import { RequestContext } from "../../providers/RequestProvider";

const RequestPuzzle = ({ puzzle, modal, toggle }) => {
    const { addRequestDeactivatePuzzle } = useContext(RequestContext);
    const history = useHistory();

    const [newRequest, setNewRequest] = useState({
        puzzleId: puzzle.id,
        senderOfPuzzleUserId: puzzle.currentOwnerId,
        content: ""
    })


    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handleFieldChange = (e) => {
        const stateToChange = { ...newRequest };
        stateToChange[e.target.id] = e.target.value;
        setNewRequest(stateToChange);
    };

    const sendRequestDeactivatePuzzle = (e) => {
        e.preventDefault();
        addRequestDeactivatePuzzle(newRequest);
        toggle();
        sleep(300).then(() => {
            history.push("/request/outgoing");
        })
    }

    const closeResetModal = () => {
        setNewRequest({
            puzzleId: puzzle.id,
            senderOfPuzzleUserId: puzzle.currentOwnerId,
            content: ""
        })
        toggle();
    }

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle} className="postRequest">
                <ModalHeader toggle={toggle}>Enter a Message (if you wish)</ModalHeader>
                <ModalBody>
                    Your e-mail address will be shared with the current owner of the puzzle
                    <Form className="postRequestForm">
                        <FormGroup>
                            <Label className="requestContentLabel">Message:</Label>
                            <Input
                                className="editingPuzzle"
                                onChange={handleFieldChange}
                                type="textarea"
                                id="content"
                                value={newRequest.content}
                                placeholder="Enter Your Message Here"
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={sendRequestDeactivatePuzzle}>Send Request</Button>{' '}
                    <Button color="secondary" onClick={closeResetModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>


    )

}

export default RequestPuzzle;


