import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { Row, Col, CardImg, Card, CardBody, Button } from "reactstrap";
import { currentDateTime } from "../helperFunctions";
import { useHistory } from "react-router-dom";
import { PuzzleContext } from "../../providers/PuzzleProvider";


const PuzzleDetails = () => {
    const { puzzle, getPuzzleById } = useContext(PuzzleContext);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        getPuzzleById(id)
    }, [])

    return (
        <>
            {puzzle &&
                <Card className="m-4">
                    <Row margin="m-4">
                        <Col sm="4">
                            <p className="text-left px-2">Posted by: {puzzle.userProfile.displayName}
                                <br></br>
                        on {currentDateTime(puzzle.createDateTime)}</p>
                        </Col>
                        <Col sm="4">
                            <p><strong>{puzzle.title}</strong>
                                <br></br>
                                {puzzle.manufacturer}
                                <br />
                                {puzzle.pieces}
                            </p>
                            <p>Notes:{puzzle.notes}</p>
                        </Col>

                        <Col sm="4">
                            <p>Category: {puzzle.category.name}</p>
                        </Col>
                    </Row>
                    <CardImg src={puzzle.imageLocation} alt={puzzle.title} />
                    <CardBody>
                    </CardBody>
                    {puzzle.histories.map((history) => {
                        return (<p key={history.id}>{history.userProfile.displayName}: {currentDateTime(history.startDateOwnership)} to {history.endDateOwnership != null ? currentDateTime(history.endDateOwnership) : "present"}</p>)
                    })}
                </Card>
            }
        </>

    )

}

export default PuzzleDetails;