import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { currentDateAndTime } from "../helperFunctions";
import { Row, Col, Card, CardTitle, CardBody, Button } from "reactstrap";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { CommentContext } from "../../providers/CommentProvider";
import DeleteComment from "./DeleteComment";

const Comment = ({ comment }) => {

    const history = useHistory();
    const { activeUser } = useContext(UserProfileContext);
    const { deleteComment } = useContext(CommentContext);

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);



    return (
        <>
            <Row >
                <DeleteComment toggle={toggle} modal={modal} deleteComment={deleteComment} comment={comment} />
                <Card className="m-2">


                    <p className="text-left px-2">
                        {currentDateAndTime(comment.createDateTime)}
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
                            <Button onClick={() => history.push(`/comment/edit/${comment.id}`)}>Edit </Button>
                            <Button color="danger" onClick={toggle}>Delete</Button>
                        </> : null
                    }




                </Card >

            </Row>


        </>
    );
}

export default Comment;