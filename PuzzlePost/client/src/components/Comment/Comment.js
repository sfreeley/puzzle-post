import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { currentDateAndTime } from "../helperFunctions";
import { Row, Col, Card, CardTitle, CardBody, Button, Toast, ToastBody, ToastHeader } from "reactstrap";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { CommentContext } from "../../providers/CommentProvider";
import DeleteComment from "./DeleteComment";
import EditComment from "../Comment/EditComment";
import "./styles/Comment.css";

const Comment = ({ comment, }) => {

    const history = useHistory();
    const { activeUser } = useContext(UserProfileContext);
    const { deleteComment, editComment, getCommentById } = useContext(CommentContext);

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);



    return (
        <>

            <DeleteComment toggle={toggle} modal={modal} deleteComment={deleteComment} comment={comment} />
            <Toast >


                <ToastHeader>
                    Written by: <strong>{comment.userProfile.displayName}</strong>
                    <p> {currentDateAndTime(comment.createDateTime)}</p>
                </ToastHeader>


                <ToastBody>
                    <p><strong>{comment.title}</strong></p>
                    <p>{comment.content}</p>
                </ToastBody>

                {comment.userProfileId === parseInt(activeUser.id) ?

                    <div className="commentButtonContainer">
                        <Button className="commentEdit--button" id={comment.id} outline onClick={() => history.push(`/comment/edit/${comment.id}`)}>Edit </Button>
                        <Button className="commentDelete--button" outline flat onClick={toggle}>Delete</Button>
                    </div> : null
                }

            </Toast>


        </>
    );
}

export default Comment;