import React, { useContext, useEffect, useState } from "react";
import { Card, CardImg, CardBody, Row, Button, Col } from "reactstrap";
import { currentDateTime } from "../helperFunctions";
import { NavLink } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { PuzzleContext } from "../../providers/PuzzleProvider";
import { RequestContext } from "../../providers/RequestProvider";

const Request = ({ request }) => {
    const { activeUser } = useContext(UserProfileContext);
    const { updatePuzzleOwner } = useContext(PuzzleContext);
    const { getAllPendingRequests } = useContext(RequestContext);
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

    const updateOwner = () => {
        updatePuzzleOwner(confirmPuzzle);
        getAllPendingRequests(parseInt(activeUser.id));

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
                            {window.location.href == "http://localhost:3000/request/incoming" ?
                                <>
                                    <Button type="button" onClick={updateOwner}>Confirm</Button>

                                    <Button>Deny</Button>
                                </> :
                                null}
                        </Col>
                    </Row>
                </CardBody>
            </Card>

        </>
    )

}
export default Request;