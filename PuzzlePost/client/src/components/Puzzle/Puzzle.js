import React, { useContext, useState } from "react";
import {
    Card, CardImg, CardBody, Row, Button, Col,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input
} from "reactstrap";
import { currentDateTime } from "../helperFunctions";
import { NavLink, useHistory } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { PuzzleContext } from "../../providers/PuzzleProvider";
import { RequestContext } from "../../providers/RequestProvider";

const Puzzle = ({ puzzle }) => {
    const { activeUser } = useContext(UserProfileContext);
    const { reactivatePuzzle } = useContext(PuzzleContext);
    const { addRequestDeactivatePuzzle } = useContext(RequestContext);

    const history = useHistory();
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const reactivateAPuzzle = () => {
        reactivatePuzzle(puzzle.id);
        history.push("/puzzle");
    }

    const [newRequest, setNewRequest] = useState({
        puzzleId: puzzle.id,
        senderOfPuzzleUserId: puzzle.currentOwnerId,
        content: ""
    })

    const handleFieldChange = (e) => {
        const stateToChange = { ...newRequest };
        stateToChange[e.target.id] = e.target.value;
        setNewRequest(stateToChange);
    };

    const sendRequestDeactivatePuzzle = () => {
        addRequestDeactivatePuzzle(newRequest);
        history.push("/request/outgoing");
    }

    return (
        <>
            <Card className="m-4">
                <Row margin="m-4">
                    <Col sm="4">
                        <p className="text-left px-2">Shared by: {puzzle.userProfile.displayName}
                            <br />
                        on {currentDateTime(puzzle.createDateTime)}</p>
                    </Col>
                    <Col sm="4">
                        <div><strong>{puzzle.title}</strong>
                            <br />
                            {puzzle.manufacturer}
                            <br />
                            {puzzle.pieces} pieces
                            <br />
                            {(window.location.href == `http://localhost:3000/puzzle/details/${puzzle.id}` && puzzle.notes != null) || (window.location.href == `http://localhost:3001/puzzle/details/${puzzle.id}` && puzzle.notes != null) ?
                                <div>Notes : {puzzle.notes}</div> : null
                            }

                        </div>
                    </Col>

                    <Col sm="4">
                        <p>Category: {puzzle.category.name}</p>
                    </Col>
                </Row>
                <CardImg src={puzzle.imageLocation} alt={puzzle.title} />
                <CardBody>
                    <Row>
                        <Col sm="4">
                            <NavLink to={`/puzzle/details/${puzzle.id}`}><Button>Details</Button></NavLink>

                            {parseInt(activeUser.id) == puzzle.currentOwnerId ?
                                <>
                                    <NavLink to={`/puzzle/edit/${puzzle.id}`}><Button>Edit</Button></NavLink>
                                    <NavLink to={`puzzle/delete/${puzzle.id}`}><Button>Delete</Button></NavLink>
                                </> : null
                            }

                            {/* this Request button only shows if user is not the current owner of the puzzle */}
                            {parseInt(activeUser.id) !== puzzle.currentOwnerId ?
                                < Button type="button" onClick={toggle}> Request </Button> : null}
                            {/* this Reactivate button only shows if in progress on the user's puzzle list (ie isAvailable === 0) */}
                            {puzzle.isAvailable === 0 ?
                                <Button type="button" onClick={reactivateAPuzzle}> Reactivate</Button> : null}
                        </Col>

                        {window.location.href == "http://localhost:3000/puzzle/user" ?
                            puzzle.histories && puzzle.histories.map((history) => {

                                return (<p key={history.id}>{history.userProfile.displayName}: {currentDateTime(history.startDateOwnership)} to {history.endDateOwnership != null ? currentDateTime(history.endDateOwnership) : "present"}</p>)

                            }) : null
                        }

                    </Row>
                </CardBody>
            </Card>

            <div>

                <Modal isOpen={modal} toggle={toggle} className="postRequest">
                    <ModalHeader toggle={toggle}>Enter a Message (if you wish)</ModalHeader>
                    <ModalBody>
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
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>

        </>
    )

}
export default Puzzle;