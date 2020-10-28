import React, { useContext, useEffect, useState } from "react";
import {
    Card, CardImg, CardBody, Row, Button, Col,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input
} from "reactstrap";
import { currentDateTime } from "../helperFunctions";
import { NavLink } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { PuzzleContext } from "../../providers/PuzzleProvider";
import { RequestContext } from "../../providers/RequestProvider";

const Request = ({ request }) => {
    const { activeUser } = useContext(UserProfileContext);
    const { updatePuzzleOwner } = useContext(PuzzleContext);
    const { getAllPendingRequests, getAllOutgoingRequests, postRejection, deleteRequest } = useContext(RequestContext);

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    //setting updating puzzle object into state; need to give value to currentOwnerId to pass into update owner function (will be the requester of the puzzle who will be new owner)
    const [confirmPuzzle, setConfirmPuzzle] = useState({
        id: request.puzzleId,
        categoryId: request.puzzle.categoryId,
        title: request.puzzle.title,
        manufacturer: request.puzzle.manufacturer,
        imageLocation: request.puzzle.imageLocation,
        pieces: request.puzzle.pieces,
        notes: request.puzzle.notes
    })
    console.log(confirmPuzzle);

    const [rejection, setRejection] = useState({
        puzzleId: request.puzzleId,
        requestingPuzzleUserId: request.requestingPuzzleUserId,
        content: ""
    })

    const updateOwner = (e) => {
        e.prevenDefault();
        updatePuzzleOwner(confirmPuzzle);
    }

    const handleFieldChange = (e) => {
        const stateToChange = { ...rejection };
        stateToChange[e.target.id] = e.target.value;
        setRejection(stateToChange);

    };

    const rejectRequest = () => {
        postRejection(rejection);
        // getAllPendingRequests(parseInt(activeUser.id));

    }

    const deleteOutgoingRequest = (e) => {
        e.prevenDefault();
        deleteRequest(request.id);
        // getAllOutgoingRequests(parseInt(activeUser.id));
    }

    return (
        <>
            <Card className="m-4">
                <Row margin="m-4">
                    <Col sm="4">

                        <p className="text-left px-2">Requested by: {request.userProfile.displayName}
                            <br />
                        on {currentDateTime(request.createDateTime)}</p>
                        <p>Status: {request.status.name}</p>
                    </Col>
                    <Col sm="4">
                        <div>
                            {request.puzzle.title} : {request.puzzle.manufacturer}
                            <hr />
                            {request.content != null ? <div>{request.content}</div> : null}

                        </div>
                    </Col>
                </Row>
                {/* <CardImg src={request.puzzle.imageLocation} alt={request.title} /> */}
                <CardBody>
                    <Row>
                        <Col sm="4">
                            {request.senderOfPuzzleUserId === parseInt(activeUser.id) ?
                                <>
                                    <Button type="button" onClick={updateOwner}>Confirm</Button>

                                    <Button type="button" onClick={toggle}>Deny</Button>
                                </> :
                                null}

                            {request.requestingPuzzleUserId === parseInt(activeUser.id) ?
                                <>
                                    <Button type="button" onClick={deleteOutgoingRequest}> Delete </Button>
                                </> : null}
                        </Col>
                    </Row>
                </CardBody>
            </Card>

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


        </>
    )

}
export default Request;