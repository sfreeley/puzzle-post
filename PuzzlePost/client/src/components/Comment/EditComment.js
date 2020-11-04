import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { CommentContext } from "../../providers/CommentProvider";
import { PuzzleContext } from "../../providers/PuzzleProvider";
import { Form, FormGroup, Label, Input, Button, CardHeader } from "reactstrap";
import "./styles/EditComment.css";
import { BsSkipBackwardFill } from "react-icons/bs";

const EditComment = () => {

    const { id } = useParams();
    const history = useHistory();
    const { editComment, getCommentById, comment } = useContext(CommentContext);
    const { puzzle, getPuzzleById } = useContext(PuzzleContext);
    const [updatedComment, setUpdatedComment] = useState({})
    const [isLoading, setIsLoading] = useState(false);

    const handleEditFieldChange = (e) => {
        const stateToChange = { ...updatedComment }
        stateToChange[e.target.id] = e.target.value;
        setUpdatedComment(stateToChange)
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect(() => {
        getCommentById(id);
    }, [])

    useEffect(() => {
        getPuzzleById(comment.puzzleId);
        setUpdatedComment(comment);
    }, [comment])

    //edit comment function
    const editAComment = (e) => {
        e.preventDefault();
        setIsLoading(true);
        editComment(updatedComment);
        sleep(300).then(() => {
            (history.push(`/puzzle/details/${comment.puzzleId}`))
        })

    }

    return (
        <>
            <div className="editComment--container">

                <div className="editCommentImage--container" >
                    <CardHeader className="editCommentImage--title" style={{ width: "35rem", fontSize: "1.4rem" }}><strong>{puzzle.title}</strong></CardHeader>
                    <img className="editComment--image" style={{ width: "35rem" }} src={puzzle.imageLocation} alt={puzzle.title} />
                    <Link className="backToDetails--link" role="button" style={{ fontSize: "1.2rem", color: "grey" }} to={`/puzzle/details/${updatedComment.puzzleId}`}><BsSkipBackwardFill size={40} color="teal" /> Back to Details</Link>
                </div>
                <div className="puzzleCommentEdit">
                    {updatedComment &&
                        <Form>

                            <FormGroup>
                                <Label htmlFor="title"><strong>Title</strong></Label>
                                <Input className="p-2 bd-highlight justify-content-center"
                                    defaultValue={updatedComment.title}
                                    onChange={handleEditFieldChange}
                                    type="text"
                                    name="title"
                                    id="title"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="content"><strong>What are you thinking?</strong></Label>
                                <Input className="p-2 bd-highlight justify-content-center"
                                    defaultValue={updatedComment.content}
                                    onChange={handleEditFieldChange}
                                    type="textarea"
                                    name="content"
                                    id="content"
                                />
                            </FormGroup>
                            <Button block className="editCommentSubmit--button" type="button" outline id="editComment" onClick={editAComment}>
                                {'Save'}
                            </Button>
                            <Button block className="editCommentCancel--button" type="button" outline onClick={() => history.goBack()}>
                                {'Cancel'}
                            </Button>
                        </Form >

                    }
                </div>
            </div >

        </>
    )
};

export default EditComment;