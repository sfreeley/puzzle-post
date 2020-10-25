import React, { useContext } from "react";
import { Card, CardImg, CardBody, Row, Button, Col } from "reactstrap";

import { NavLink } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";

const Puzzle = ({ puzzle }) => {
    return (
        <>
            <Card className="m-4">
                <Row margin="m-4">
                    <Col sm="4">
                        <p className="text-left px-2">Posted by: {puzzle.userProfile.displayName}
                            <br></br>
                        on {puzzle.createDateTime}</p>
                    </Col>
                    <Col sm="4">
                        <p><strong>{puzzle.title}</strong>
                            <br></br>
                            {puzzle.manufacturer}
                        </p>
                    </Col>

                    <Col sm="4">
                        <p>Category: {puzzle.category.name}</p>
                    </Col>
                </Row>
                <CardImg src={puzzle.imageLocation} alt={puzzle.title} />
                <CardBody>
                    <Row>
                        <Col sm="4">
                            <NavLink to={`puzzle/details/${puzzle.id}`}><Button>Details</Button></NavLink>
                            <NavLink to={`puzzle/edit/${puzzle.id}`}><Button>Edit</Button></NavLink>
                            <NavLink to={`puzzle/delete/${puzzle.id}`}><Button>Delete</Button></NavLink>
                            <Button>Request</Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>

        </>
    )

}
export default Puzzle;