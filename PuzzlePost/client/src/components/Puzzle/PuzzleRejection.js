import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import { RequestContext } from "../../providers/RequestProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";


const PuzzleRejection = ({ modal, toggle, request }) => {
    const { activeUser } = useContext(UserProfileContext);
    const { getAllPendingRequests, updateRejection } = useContext(RequestContext);


    const [rejection, setRejection] = useState({
        id: request.id,
        puzzleId: request.puzzleId,
        requestingPuzzleUserId: request.requestingPuzzleUserId,
        content: request.content

    })

    const rejectRequest = () => {
        updateRejection(rejection);
        toggle();
        getAllPendingRequests(parseInt(activeUser.id));
    }
    useEffect(() => {
        getAllPendingRequests(parseInt(activeUser.id));
    })

    // const handleFieldChange = (e) => {
    //     const stateToChange = { ...rejection };
    //     stateToChange[e.target.id] = e.target.value;
    //     setRejection(stateToChange);
    // };



    // const closeResetModal = () => {
    //     setRejection({
    //         puzzleId: request.puzzleId,
    //         requestingPuzzleUserId: request.requestingPuzzleUserId,
    //         content: ""
    //     })
    //     toggle();
    // }


    return (
        <div>

            <Modal isOpen={modal} toggle={toggle} className="rejection">
                <ModalHeader toggle={toggle}>Please confirm</ModalHeader>
                <ModalBody>
                    <Form className="rejectionForm">
                        <FormGroup>
                            Are you sure you want to deny this puzzle request?
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

