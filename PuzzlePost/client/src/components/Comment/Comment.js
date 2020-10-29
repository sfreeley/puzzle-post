import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { currentDateTime } from "../helperFunctions";
import { Row, Col, Card, CardTitle, CardBody, Button } from "reactstrap";
import { UserProfileContext } from "../../providers/UserProfileProvider";

const Comment = ({ comment }) => {

    const history = useHistory();
    const { activeUser } = useContext(UserProfileContext);

    return (
        <Row >

            <Card className="m-2">


                <p className="text-left px-2">
                    {currentDateTime(comment.createDateTime)}
                    <br></br>
                Written by: <strong>{comment.userProfile.displayName}</strong>
                </p>


                <CardBody>
                    <p><strong>{comment.title}</strong></p>
                    <p>{comment.content}</p>
                </CardBody>

                {comment.userProfileId === parseInt(activeUser.id) ?
                    // fix thissssss
                    <>
                        <Button onClick={() => history.push(`/comments/edit/${comment.id}`)}>Edit </Button>
                        <Button color="danger" onClick={() => history.push(`/comments/delete/${comment.id}`)}>Delete</Button>
                    </> : null
                }



            </Card >

        </Row>
    );
}

export default Comment;