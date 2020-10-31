import React, { useContext, useState } from "react";
import {
    Card, CardImg, CardBody, Row, Button, Col
} from "reactstrap";
import { currentDateTime } from "../helperFunctions";
import { Link, useHistory } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { PuzzleContext } from "../../providers/PuzzleProvider";
import DeletePuzzle from "./DeletePuzzle";
import RequestPuzzle from "./RequestPuzzle";

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
            <Card sm="6">
                <Row margin="m-4">
                    <Col sm="4">
                        <p className="text-left px-2">Shared by: {puzzle.userProfile.displayName}
                            <br />
                        on {currentDateTime(puzzle.createDateTime)}</p>
                    </Col>
                    <Col sm="4">
                        <div><strong>{puzzle.title}</strong>
                            <br />
                            {puzzle.manufacturer}
                            <br />
                            {puzzle.pieces} pieces
                            <br />
                            {(window.location.pathname === "/puzzle/user" && puzzle.notes !== "") ?
                                <p>Notes: {puzzle.notes}</p> : null
                            }
                        </div>
                    </Col>

                    <Col sm="4">
                        <p>Category: {puzzle.category.name}</p>
                    </Col>
                </Row>
                <CardImg top src={puzzle.imageLocation} alt={puzzle.title} />
                <CardBody>
                    <Row>
                        <Col sm="4">
                            <Link to={`/puzzle/details/${puzzle.id}`}><Button>Details</Button></Link>

                            {parseInt(activeUser.id) == puzzle.currentOwnerId ?
                                <>
                                    <Link to={`/puzzle/edit/${puzzle.id}`}><Button>Edit</Button></Link>
                                    <Button onClick={toggleDelete}>Delete</Button>
                                </> : null
                            }

                            {/* this Request button only shows if user is not the current owner of the puzzle */}
                            {parseInt(activeUser.id) !== puzzle.currentOwnerId ?
                                < Button type="button" onClick={toggle}> Request </Button> : null}
                            {/* this Reactivate button only shows if in progress on the user's puzzle list (ie isAvailable === 0) */}
                            {puzzle.isAvailable === 0 ?
                                <Button id={puzzle.id} type="button" onClick={reactivateAPuzzle}> Reactivate</Button> : null}
                        </Col>

                        {/* {window.location.pathname == "/puzzle/user" ?
                            puzzle.histories && puzzle.histories.map((history) => {

                                return (<p key={history.id}>{history.userProfile.displayName}: {currentDateTime(history.startDateOwnership)} to {history.endDateOwnership != null ? currentDateTime(history.endDateOwnership) : "present"}</p>)

                            }) : null
                        } */}

                    </Row>
                </CardBody>
            </Card>
        </>
    )

}
export default Puzzle;