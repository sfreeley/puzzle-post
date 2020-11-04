import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col, CardImg, Card, Button, UncontrolledPopover } from "reactstrap";
import { currentDateTime } from "../helperFunctions";
import { PuzzleContext } from "../../providers/PuzzleProvider";
import { CommentContext } from "../../providers/CommentProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import RequestPuzzle from "./RequestPuzzle";
import Comment from "../Comment/Comment";
import CommentList from "../Comment/CommentList";
import AddComment from "../Comment/AddComment";
import DeletePuzzle from "../Puzzle/DeletePuzzle";
import "./styles/PuzzleDetails.css";


const PuzzleDetails = () => {

    const { puzzle, getPuzzleById, getPuzzleWithUserProfile, puzzleWithProfile, deletePuzzle } = useContext(PuzzleContext);
    const { addComment, getAllCommentsForPuzzle, allComments } = useContext(CommentContext);
    const { activeUser } = useContext(UserProfileContext);
    const { id } = useParams();
    const history = useHistory();

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [deleteModal, setDeleteModal] = useState(false);
    const toggleDelete = () => setDeleteModal(!deleteModal);

    const [isLoading, setIsLoading] = useState(false)

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect(() => {

        getPuzzleById(id);
        getPuzzleWithUserProfile(id);


    }, [])




    const [newComment, setNewComment] = useState({
        puzzleId: parseInt(id),
        title: "",
        content: ""
    })

    const handleFieldChange = (e) => {
        const stateToChange = { ...newComment };
        stateToChange[e.target.id] = e.target.value;
        setNewComment(stateToChange);
    };


    const addNewComment = () => {
        if (newComment.subject === "" || newComment.content === "") {
            alert(`${puzzleWithProfile.userProfile.displayName} you have to write something!`);
        } else {
            setIsLoading(true);
            addComment(newComment);
            setIsLoading(false);
            setNewComment({
                puzzleId: parseInt(id),
                title: "",
                content: ""
            })

            history.push(`/commentsforpuzzle/${id}`)

        }
    };

    const cancelAdd = () => {
        setNewComment({
            puzzleId: parseInt(id),
            title: "",
            content: ""
        })

    }

    const deleteAPuzzle = (e) => {
        e.preventDefault();
        deletePuzzle(e.target.id);
        toggleDelete();

        sleep(300).then(() => {
            history.push("/puzzle");
        })

    }

    const routeToEdit = () => {
        history.push(`/puzzle/edit/${puzzle.id}`)
    }

    return (
        <>
            <RequestPuzzle toggle={toggle} modal={modal} puzzle={puzzle} />
            <DeletePuzzle deleteModal={deleteModal} toggleDelete={toggleDelete} puzzle={puzzle} deleteAPuzzle={deleteAPuzzle} />


            <div className="puzzleCommentsContainer">
                <div className="commentSection">
                    <div className="addCommentButton--container">
                        {puzzle.isAvailable === 0 ? null :
                            <Button id="addComment" >Add Comment</Button>
                        }
                    </div>

                    <AddComment cancelAdd={cancelAdd} addNewComment={addNewComment} handleFieldChange={handleFieldChange} newComment={newComment} />

                </div>
                {puzzle &&
                    <div className="puzzleDetails">
                        <Card style={{ width: "40rem" }}>
                            <CardImg top src={puzzle.imageLocation} alt={puzzle.title} />
                            <Row margin="m-4">
                                <Col sm="4">
                                    <p className="text-left px-2"><strong>Shared by:</strong> {puzzleWithProfile.userProfile.displayName}
                                        <br></br>
                        on {currentDateTime(puzzle.createDateTime)}</p>
                                </Col>
                                <Col sm="4">
                                    <p className="puzzleDetails--title"><strong>{puzzle.title}</strong>
                                        <br></br>
                                        {puzzle.manufacturer}
                                        <br />
                                        {puzzle.pieces} pieces
                            </p>
                                    {puzzle.notes !== null ?
                                        <p>Notes:{puzzle.notes}</p> : null
                                    }
                                </Col>

                                <Col sm="4">
                                    <p><strong>Category:</strong> {puzzle.category.name}</p>
                                </Col>
                            </Row>
                            <Button className="ownershipButton" outline id="PopoverClick" type="button">
                                See Ownership History
                            </Button>
                            <UncontrolledPopover trigger="click" placement="top" target="PopoverClick" >
                                {puzzle.histories.map((history) => {
                                    return (<p key={history.id}>{history.userProfile.displayName}: {currentDateTime(history.startDateOwnership)} to {history.endDateOwnership != null ? currentDateTime(history.endDateOwnership) : "present"}</p>)
                                })}
                            </UncontrolledPopover>


                            {parseInt(activeUser.id) === puzzle.currentOwnerId ?

                                <div className="puzzleDetailsButtons--container">

                                    <Button className="editPuzzleDetails--button" onClick={routeToEdit}>Edit</Button>

                                    <Button className="togglePuzzleDelete--button" id={puzzle.id} onClick={toggleDelete}>Delete</Button>

                                </div>
                                :
                                <div className="requestPuzzleDetails--container">
                                    <Button className="requestPuzzleDetails--button" onClick={toggle}>Request</Button>
                                </div>

                            }

                        </Card>

                    </div>

                }

            </div>






        </>

    )

}

export default PuzzleDetails;