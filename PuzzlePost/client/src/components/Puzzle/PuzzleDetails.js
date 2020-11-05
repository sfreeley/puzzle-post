import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col, CardImg, Card, Button, UncontrolledPopover, ListGroupItem } from "reactstrap";
import { currentDateTime } from "../helperFunctions";
import { PuzzleContext } from "../../providers/PuzzleProvider";
import { CommentContext } from "../../providers/CommentProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import RequestPuzzle from "./RequestPuzzle";
import AddComment from "../Comment/AddComment";
import Comment from "../Comment/Comment";
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
        getAllCommentsForPuzzle(id);
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

            sleep(300).then(() => {
                getAllCommentsForPuzzle(id);
            })


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

    const getAllComments = () => {
        getAllCommentsForPuzzle(id);
    }

    const routeToEdit = () => {
        history.push(`/puzzle/edit/${puzzle.id}`)
    }

    return (
        <>
            <RequestPuzzle toggle={toggle} modal={modal} puzzle={puzzle} />
            <DeletePuzzle deleteModal={deleteModal} toggleDelete={toggleDelete} puzzle={puzzle} deleteAPuzzle={deleteAPuzzle} />

            <div className="puzzleCommentsContainer">

                <div className="puzzleDetails--container">
                    <Card className="puzzleDetails" style={{ width: "40rem" }}>
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
                            </Col>
                            <Col>
                                {puzzle.notes !== "" ?
                                    <p><strong>Notes:</strong> {puzzle.notes}</p> : null
                                }
                            </Col>

                            <Col sm="6">
                                <p><strong>Category:</strong> {puzzle.category.name}</p>
                            </Col>
                        </Row>
                        <Button className="ownershipButton" id="PopoverClick" type="button">
                            See Ownership History
                            </Button>
                        <UncontrolledPopover trigger="legacy" placement="top" target="PopoverClick" >
                            {puzzle.histories.map((history) => {
                                return (<ListGroupItem key={history.id} className="historyList--groupItem"><strong>{history.userProfile.displayName}:</strong>  {currentDateTime(history.startDateOwnership)} to {history.endDateOwnership != null ? currentDateTime(history.endDateOwnership) : "present"}</ListGroupItem>)
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


                <div className="commentSection">

                    {puzzle.isAvailable === 0 ? null :
                        <>
                            <div className="addCommentButton--container">
                                <Button className="addComment--button" id="addComment" >Add Comment</Button>

                            </div>
                            {allComments && allComments.map((aComment) => {
                                return (
                                    <Comment key={aComment.id} aComment={aComment} getAllComments={getAllComments} />
                                )

                            })}
                        </>
                    }

                </div>
                <AddComment cancelAdd={cancelAdd} addNewComment={addNewComment} handleFieldChange={handleFieldChange} newComment={newComment} />
            </div>
        </>

    )

}

export default PuzzleDetails;