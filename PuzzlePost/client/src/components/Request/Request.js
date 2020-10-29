import React, { useContext, useEffect, useState } from "react";
import { Card, CardImg, CardBody, Row, Button, Col } from "reactstrap";
import { currentDateTime } from "../helperFunctions";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { PuzzleContext } from "../../providers/PuzzleProvider";
import { RequestContext } from "../../providers/RequestProvider";
import PuzzleRejection from "../Puzzle/PuzzleRejection";

const Request = ({ request }) => {
    const { activeUser } = useContext(UserProfileContext);
    const { updatePuzzleOwner } = useContext(PuzzleContext);
    const { deleteRequest, getAllOutgoingRequests, getAllPendingRequests } = useContext(RequestContext);

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    // useEffect(() => {
    //     getAllOutgoingRequests(parseInt(activeUser.id));
    //     getAllPendingRequests(parseInt(activeUser.id));
    // }, [])

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


    const updateOwner = (e) => {
        e.preventDefault();
        updatePuzzleOwner(confirmPuzzle);
        setConfirmPuzzle()
    }


    const deleteOutgoingRequest = (e) => {
        debugger
        // e.preventDefault();
        deleteRequest(request.id);

    }

    return (
        <>
            <PuzzleRejection toggle={toggle} modal={modal} request={request} />
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



        </>
    )

}
export default Request;