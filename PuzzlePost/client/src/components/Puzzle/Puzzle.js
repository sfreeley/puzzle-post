import React, { useContext, useState } from "react";
import {
    Card, CardImg, CardBody, Row, Button, Col, CardTitle, CardHeader, ListGroupItem, ListGroup
} from "reactstrap";
import { currentDateTime } from "../helperFunctions";
import { Link, useHistory } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { PuzzleContext } from "../../providers/PuzzleProvider";
import DeletePuzzle from "./DeletePuzzle";
import RequestPuzzle from "./RequestPuzzle";
import "./styles/Puzzle.css";

const Puzzle = ({ puzzle }) => {
    const { activeUser } = useContext(UserProfileContext);
    const { deletePuzzle, reactivatePuzzle, setActivePuzzles, activePuzzles } = useContext(PuzzleContext);

    const history = useHistory();
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [deleteModal, setDeleteModal] = useState(false);
    const toggleDelete = () => setDeleteModal(!deleteModal);

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const reactivateAPuzzle = (e) => {
        e.preventDefault();
        reactivatePuzzle(puzzle.id);
        sleep(300).then(() => {
            history.push("/puzzle");
        })

    }

    const deleteAPuzzle = (e) => {
        e.preventDefault();
        deletePuzzle(e.target.id);
        toggleDelete();
    }

    return (
        <>

            <RequestPuzzle toggle={toggle} modal={modal} puzzle={puzzle} />
            <DeletePuzzle toggleDelete={toggleDelete} deleteModal={deleteModal} puzzle={puzzle} deleteAPuzzle={deleteAPuzzle} />

            <Card style={{ width: "18rem" }}>
                <CardHeader> <Link to={`/puzzle/details/${puzzle.id}`}><Button>Details</Button></Link></CardHeader>
                <CardImg className="puzzleImage" src={puzzle.imageLocation} alt={puzzle.title} />


                <CardTitle text-center> <strong>{puzzle.title}</strong> {puzzle.manufacturer}</CardTitle>
                <CardBody>
                    <ListGroup>
                        <ListGroupItem>
                            Shared on: {currentDateTime(puzzle.createDateTime)}
                        </ListGroupItem>
                        <ListGroupItem>
                            Shared by: {puzzle.userProfile.displayName}
                        </ListGroupItem>
                        <ListGroupItem>
                            Category: {puzzle.category.name}
                        </ListGroupItem>
                        <ListGroupItem>
                            {puzzle.pieces} pieces
                        </ListGroupItem>
                        <ListGroupItem>
                            {(window.location.pathname === "/puzzle/user" && puzzle.notes !== "") ?
                                <p>Notes: {puzzle.notes}</p> : null
                            }
                        </ListGroupItem>
                    </ListGroup>
                </CardBody>
                {parseInt(activeUser.id) == puzzle.currentOwnerId ?
                    <>
                        <Button outline flat onClick={() => history.push(`/puzzle/edit/${puzzle.id}`)}>Edit</Button>
                        <Button outline flat onClick={toggleDelete}>Delete</Button>
                    </> : null
                }
                {/* this Request button only shows if user is not the current owner of the puzzle */}
                {parseInt(activeUser.id) !== puzzle.currentOwnerId ?
                    < Button type="button" onClick={toggle}> Request </Button> : null}
                {/* this Reactivate button only shows if in progress on the user's puzzle list (ie isAvailable === 0) */}
                {puzzle.isAvailable === 0 ?
                    <Button id={puzzle.id} type="button" onClick={reactivateAPuzzle}> Reactivate</Button> : null}

            </Card >

        </>
    )

}
export default Puzzle;