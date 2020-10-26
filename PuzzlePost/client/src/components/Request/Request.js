import React, { useContext } from "react";
import { Card, CardImg, CardBody, Row, Button, Col } from "reactstrap";
import { currentDateTime } from "../helperFunctions";
import { NavLink } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";

const Request = ({ request }) => {
    const { activeUser } = useContext(UserProfileContext);

    return (
        <>
            <Card className="m-4">
                <Row margin="m-4">
                    <Col sm="4">

                        <p className="text-left px-2">Requested by: {request.userProfile.displayName}
                            <br />
                        on {currentDateTime(request.createDateTime)}</p>
                    </Col>
                    <Col sm="4">
                        <div>

                            {request.content != null ? <div>{request.content}</div> : null}

                        </div>
                    </Col>


                </Row>
                {/* <CardImg src={request.imageLocation} alt={request.title} /> */}
                <CardBody>
                    <Row>
                        <Col sm="4">
                            <Button>Confirm</Button>

                            <Button>Deny</Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>

        </>
    )

}
export default Request;