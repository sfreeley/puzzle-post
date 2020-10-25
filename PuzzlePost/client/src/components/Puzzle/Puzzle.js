import React, { useContext } from "react";
import { Card, CardImg, CardBody, Row, Button, Col } from "reactstrap";
import { currentDateTime } from "../helperFunctions";
import { NavLink } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";

const Puzzle = ({ puzzle }) => {
    const { activeUser } = useContext(UserProfileContext);

    return (
        <>
            <Card className="m-4">
                <Row margin="m-4">
                    <Col sm="4">
                        <p className="text-left px-2">Posted by: {puzzle.userProfile.displayName}
                            <br />
                        on {currentDateTime(puzzle.createDateTime)}</p>
                    </Col>
                    <Col sm="4">
                        <div><strong>{puzzle.title}</strong>
                            <br />
                            {puzzle.manufacturer}
                            <br />
                            {puzzle.pieces}
                            <br />
                            {puzzle.notes != null ? <div>Notes: {puzzle.notes}</div> : null}

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

                            <>
                                <NavLink to={`/puzzle/edit/${puzzle.id}`}><Button>Edit</Button></NavLink>
                                <NavLink to={`puzzle/delete/${puzzle.id}`}><Button>Delete</Button></NavLink>
                            </>

                            {/* this Request button only shows if user is not the current owner of the puzzle */}
                            <Button>Request</Button>
                            {/* this Reactivate button only shows if in progress on the user's puzzle list (ie isAvailable === 0) */}
                            {puzzle.isAvailable === 0 ?
                                <Button>Reactivate</Button> : null}
                        </Col>

                        {window.location.href == "http://localhost:3000/puzzle/user" ?
                            puzzle.histories && puzzle.histories.map((history) => {

                                return <p>{history.userProfile.displayName}: {history.startDateOwnership} to {history.endDateOwnership}</p>

                            }) : null
                        }

                    </Row>
                </CardBody>
            </Card>

        </>
    )

}
export default Puzzle;