import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardImg, CardBody, Row, Button, Col, Toast } from "reactstrap";
import { currentDateAndTime } from "../helperFunctions";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { PuzzleContext } from "../../providers/PuzzleProvider";
import { RequestContext } from "../../providers/RequestProvider";
import PuzzleRejection from "../Puzzle/PuzzleRejection";
import { FaRegThumbsUp } from "react-icons/fa";
import { SiMinutemailer } from "react-icons/si";
import { FaRegThumbsDown } from "react-icons/fa";
import "./styles/Request.css";

const Request = ({ request }) => {
    const { activeUser } = useContext(UserProfileContext);
    const { updatePuzzleOwner } = useContext(PuzzleContext);
    const { deleteRequest, updateRejection } = useContext(RequestContext);
    const history = useHistory();

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

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const [rejection, setRejection] = useState({
        id: request.id,
        puzzleId: request.puzzleId,
        requestingPuzzleUserId: request.requestingPuzzleUserId,
        content: request.content
    })

    const rejectRequest = (e) => {
        updateRejection(rejection);
        toggle();
        sleep(300).then(() => {
            history.push("/puzzle");
        })
    }


    const updateOwner = (e) => {
        e.preventDefault();
        updatePuzzleOwner(confirmPuzzle);
        sleep(300).then(() => {
            history.push("/puzzle");
        })
    }

    const deleteOutgoingRequest = (e) => {
        e.preventDefault();
        deleteRequest(request.id);
        sleep(300).then(() => {
            history.push("/puzzle");
        })

    }

    return (
        <>
            <PuzzleRejection toggle={toggle} modal={modal} request={request} rejectRequest={rejectRequest} />
            <Card className="requestHistory">
                <Row margin="m-4">
                    <Col sm="4">

                        <p className="text-left px-2">
                            <p><strong><em>Requester:</em></strong> {request.requestingPuzzleUser.displayName}</p>
                        </p>
                        {request.senderOfPuzzleUserId === parseInt(activeUser.id) ?
                            <p>Requester's Email: {request.requestingPuzzleUser.email}</p> : null
                        }
                        <br />

                        {
                            request.status.name === "Accepted" && <p className="acceptedStatus"><strong><em>Status:</em></strong> {request.status.name} <FaRegThumbsUp /></p>
                        }
                        {
                            request.status.name === "Pending" && <p className="pendingStatus"><strong><em>Status:</em></strong> {request.status.name} <SiMinutemailer /></p>
                        }
                        {
                            request.status.name === "Rejected" && <p className="rejectedStatus"><strong><em>Status:</em></strong> {request.status.name} <FaRegThumbsDown /></p>
                        }

                    </Col>
                    <Col sm="6">
                        <div className="request--container">
                            <strong><em>{request.puzzle.title}</em></strong>
                            <br />
                            {request.puzzle.manufacturer}
                            <hr />

                            {request.content == "" ? <p>No Message Available</p> : <div>{request.content}</div>}
                        </div>
                    </Col>

                </Row>
                <CardBody>
                    <Row>
                        <Col sm="4">
                            {request.senderOfPuzzleUserId === parseInt(activeUser.id) ?
                                <>
                                    <Button type="button" onClick={updateOwner}>Confirm</Button>

                                    <Button type="button" onClick={toggle}>Deny</Button>
                                </> :
                                null}

                            {(request.requestingPuzzleUserId === parseInt(activeUser.id) && request.statusId === 1) ?

                                <Button type="button" className="cancelRequest--button" onClick={deleteOutgoingRequest}> Cancel Request </Button> :
                                <Button outline className="deleteRequest--button" type="button" onClick={deleteOutgoingRequest}> Delete </Button>}
                        </Col>
                        <Col sm="4">
                            <div>
                                <strong>
                                    {currentDateAndTime(request.createDateTime)}
                                </strong>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>



        </>
    )

}
export default Request;