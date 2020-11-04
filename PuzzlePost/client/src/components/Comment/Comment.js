import React, { useContext, useState, } from "react";
import { useHistory } from "react-router-dom";
import { currentDateAndTime } from "../helperFunctions";
import { Button, Toast, ToastBody, ToastHeader } from "reactstrap";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { CommentContext } from "../../providers/CommentProvider";
import DeleteComment from "./DeleteComment";
import "./styles/Comment.css";

const Comment = ({ aComment, getAllComments }) => {

    const history = useHistory();
    const { activeUser } = useContext(UserProfileContext);
    const { deleteComment } = useContext(CommentContext);

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const deleteAComment = (e) => {
        e.preventDefault();
        deleteComment(aComment.id);
        getAllComments();

    }

    return (
        <>

            <DeleteComment toggle={toggle} modal={modal} deleteAComment={deleteAComment} aComment={aComment} />
            {aComment &&
                <Toast >
                    <ToastHeader>
                        Written by: <strong>{aComment.userProfile.displayName}</strong>
                        <p> {currentDateAndTime(aComment.createDateTime)}</p>
                    </ToastHeader>

                    <ToastBody>
                        <p><strong>{aComment.title}</strong></p>
                        <p>{aComment.content}</p>
                    </ToastBody>

                    {aComment.userProfileId === parseInt(activeUser.id) ?

                        <div className="commentButtonContainer">
                            <Button className="commentEdit--button" onClick={() => history.push(`/comment/edit/${aComment.id}`)} outline >Edit </Button>
                            <Button className="commentDelete--button" outline onClick={toggle}>Delete</Button>
                        </div> : null
                    }

                </Toast>
            }


        </>
    );
}

export default Comment;