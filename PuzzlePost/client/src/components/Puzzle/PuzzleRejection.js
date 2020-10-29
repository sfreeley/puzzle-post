import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import { RequestContext } from "../../providers/RequestProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";


const PuzzleRejection = ({ modal, toggle, request }) => {
    const { activeUser } = useContext(UserProfileContext);
    const { postRejection, getAllPendingRequests } = useContext(RequestContext);
    const [rejection, setRejection] = useState({
        puzzleId: request.puzzleId,
        requestingPuzzleUserId: request.requestingPuzzleUserId,
        content: ""
    })

    useEffect(() => {
        getAllPendingRequests(parseInt(activeUser.id));
    })

    const handleFieldChange = (e) => {
        const stateToChange = { ...rejection };
        stateToChange[e.target.id] = e.target.value;
        setRejection(stateToChange);
    };

    const rejectRequest = () => {
        postRejection(rejection);
        toggle();
        getAllPendingRequests(parseInt(activeUser.id));
    }

    return (
        <div>

            <Modal isOpen={modal} toggle={toggle} className="rejection">
                <ModalHeader toggle={toggle}>Enter a Reason (if you wish)</ModalHeader>
                <ModalBody>
                    <Form className="rejectionForm">
                        <FormGroup>
                            <Label className="rejectionContentLabel">Message:</Label>
                            <Input
                                className="rejectionContent"
                                onChange={handleFieldChange}
                                type="textarea"
                                id="content"
                                value={rejection.content}
                                placeholder="Enter Your Rejection Message Here"
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={rejectRequest}>Send Rejection</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Just Kidding</Button>
                </ModalFooter>
            </Modal>
        </div>

    )
}

export default PuzzleRejection;

