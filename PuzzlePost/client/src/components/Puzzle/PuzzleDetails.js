import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, CardImg, Card, CardBody, Button } from "reactstrap";
import { currentDateTime } from "../helperFunctions";
import { PuzzleContext } from "../../providers/PuzzleProvider";
import { CommentContext } from "../../providers/CommentProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import RequestPuzzle from "./RequestPuzzle";
import CommentList from "../Comment/CommentList";
import AddComment from "../Comment/AddComment";



const PuzzleDetails = () => {
    const { puzzle, getPuzzleById, getPuzzleWithUserProfile, puzzleWithProfile } = useContext(PuzzleContext);
    const { addComment, getAllCommentsForPuzzle, deleteComment } = useContext(CommentContext);
    const { activeUser } = useContext(UserProfileContext);
    const { id } = useParams();


    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [openForm, setOpenForm] = useState(true);
    const toggleAdd = () => setOpenForm(!openForm);
    const [isLoading, setIsLoading] = useState(false)

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
            toggleAdd();
            getAllCommentsForPuzzle(id);

        }
    };

    const cancelAdd = () => {
        setNewComment({
            puzzleId: parseInt(id),
            title: "",
            content: ""
        })
        toggleAdd();
    }




    return (
        <>
            <RequestPuzzle toggle={toggle} modal={modal} puzzle={puzzle} />
            <Button onClick={toggleAdd}>Add Comment</Button>{' '}

            <AddComment cancelAdd={cancelAdd} newComment={newComment} openForm={openForm} toggleAdd={toggleAdd} addNewComment={addNewComment} handleFieldChange={handleFieldChange} />

            {puzzle &&
                <Card className="m-4">
                    <Row margin="m-4">
                        <Col sm="4">
                            <p className="text-left px-2">Shared by: {puzzleWithProfile.userProfile.displayName}
                                <br></br>
                        on {currentDateTime(puzzle.createDateTime)}</p>
                        </Col>
                        <Col sm="4">
                            <p><strong>{puzzle.title}</strong>
                                <br></br>
                                {puzzle.manufacturer}
                                <br />
                                {puzzle.pieces} pieces
                            </p>
                            <p>Notes:{puzzle.notes}</p>
                        </Col>

                        <Col sm="4">
                            <p>Category: {puzzle.category.name}</p>
                        </Col>
                    </Row>
                    <CardImg src={puzzle.imageLocation} alt={puzzle.title} />
                    <CardBody>
                    </CardBody>
                    {puzzle.histories.map((history) => {
                        return (<p key={history.id}>{history.userProfile.displayName}: {currentDateTime(history.startDateOwnership)} to {history.endDateOwnership != null ? currentDateTime(history.endDateOwnership) : "present"}</p>)
                    })}
                </Card>

            }
            {parseInt(activeUser.id) === puzzle.currentOwnerId ?
                <>
                    <Link to={`/puzzle/edit/${puzzle.id}`}><Button>Edit</Button></Link>
                    <Link to={`/puzzle/delete/${puzzle.id}`}><Button>Delete</Button></Link>

                </> : <Button onClick={toggle}>Request</Button>

            }

            <div><CommentList /></div>


        </>

    )

}

export default PuzzleDetails;