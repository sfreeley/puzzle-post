import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { CommentContext } from "../../providers/CommentProvider";
import { PuzzleContext } from "../../providers/PuzzleProvider";
import { Form, FormGroup, Label, Input, Button, CardImg } from "reactstrap";
import "./styles/EditComment.css";

const EditComment = () => {

    const { id } = useParams();
    const history = useHistory();
    const { deleteComment, editComment, getCommentById, comment } = useContext(CommentContext);
    const { puzzle, getPuzzleById, getPuzzleWithUserProfile, puzzleWithProfile, deletePuzzle } = useContext(PuzzleContext);
    const [updatedComment, setUpdatedComment] = useState({})

    const handleEditFieldChange = (e) => {
        const stateToChange = { ...updatedComment }
        stateToChange[e.target.id] = e.target.value;
        setUpdatedComment(stateToChange)
    }
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getCommentById(id);
        getPuzzleById(comment.puzzleId);
    }, [])

    useEffect(() => {
        setUpdatedComment(comment);
    }, [comment])

    //edit comment function
    const editAComment = (e) => {
        e.preventDefault();
        setIsLoading(true);
        editComment(updatedComment);

        history.push(`/puzzle/details/${comment.puzzleId}`)
    }

    return (
        <>
            <div className="editCommentContainer">
                <div className="puzzleImageEdit">
                    <CardImg style={{ width: "35rem" }} src={puzzle.imageLocation} />
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
                                <Label htmlFor="content"><strong>Comment</strong></Label>
                                <Input className="p-2 bd-highlight justify-content-center"
                                    defaultValue={updatedComment.content}
                                    onChange={handleEditFieldChange}
                                    type="textarea"
                                    name="content"
                                    id="content"
                                />
                            </FormGroup>
                            <Button block type="button" color="success" id="editComment" onClick={editAComment}>
                                {'Save'}
                            </Button>
                            <Button type="button" color="warning" onClick={() => history.goBack()}>
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