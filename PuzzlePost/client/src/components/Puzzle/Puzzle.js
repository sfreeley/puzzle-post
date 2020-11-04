import React, { useContext, useState } from "react";
import {
    Card, CardImg, CardBody, Row, Button, Col, CardTitle, CardHeader, ListGroupItem, ListGroup, CardFooter
} from "reactstrap";
import { currentDateTime } from "../helperFunctions";
import { Link, useHistory } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { PuzzleContext } from "../../providers/PuzzleProvider";
import DeletePuzzle from "./DeletePuzzle";
import RequestPuzzle from "./RequestPuzzle";
import "./styles/Puzzle.css";
import { BsFillPuzzleFill } from "react-icons/bs";

const Puzzle = ({ puzzle }) => {
    const { activeUser } = useContext(UserProfileContext);
    const { deletePuzzle, reactivatePuzzle } = useContext(PuzzleContext);
    const inProgress = puzzle.inProgress === 0 ? true : false


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
        if (window.location.pathname === "/puzzle") {
            sleep(300).then(() => {
                history.push("/puzzle/user");
            })
        }
        else {
            sleep(300).then(() => {
                history.push("/puzzle");
            })
        }

    }

    return (
        <>

            <RequestPuzzle toggle={toggle} modal={modal} puzzle={puzzle} />
            <DeletePuzzle toggleDelete={toggleDelete} deleteModal={deleteModal} puzzle={puzzle} deleteAPuzzle={deleteAPuzzle} />

            <Card className="puzzleCard" style={{ maxWidth: "18rem" }}>
                <CardImg top className="puzzleImage" src={puzzle.imageLocation} alt={puzzle.title} />

                <CardHeader className="detailsButton--container"> <Link onClick={() => history.push(`/puzzle/details/${puzzle.id}`)}><BsFillPuzzleFill size={30} color="grey" /></Link></CardHeader>

                <CardTitle className="puzzleCard--title">
                    <strong>{puzzle.title}</strong> <p>{puzzle.manufacturer}</p>
                </CardTitle>

                <ListGroup>
                    <ListGroupItem>
                        <strong><em> Shared on: </em></strong> {currentDateTime(puzzle.createDateTime)}
                    </ListGroupItem>
                    <ListGroupItem>
                        <strong><em> Current Owner: </em></strong> {puzzle.userProfile.displayName}
                    </ListGroupItem>
                    <ListGroupItem>
                        <strong><em> Category: </em></strong> {puzzle.category.name}
                    </ListGroupItem>
                    <ListGroupItem className="puzzlePieces--listItem">
                        <strong>{puzzle.pieces} </strong> pieces
                    </ListGroupItem>
                </ListGroup>
                <CardFooter className={inProgress ? 'background-green' : 'background-red'}>
                    <div className="button--container">
                        {parseInt(activeUser.id) == puzzle.currentOwnerId ?
                            <>
                                <Button outline className="editPuzzle--button" onClick={() => history.push(`/puzzle/edit/${puzzle.id}`)}>Edit</Button>
                                <Button outline className="deletePuzzle--button" onClick={toggleDelete}>Delete</Button>
                            </> : null
                        }
                        {/* this Request button only shows if user is not the current owner of the puzzle */}
                        {parseInt(activeUser.id) !== puzzle.currentOwnerId ?
                            < Button type="button" className="requestPuzzle--button" onClick={toggle}> Request </Button> : null}
                        {/* this Reactivate button only shows if in progress on the user's puzzle list (ie isAvailable === 0) */}
                        {puzzle.inProgress === 1 ?
                            <Button id={puzzle.id} className="reactivatePuzzle--button" type="button" onClick={reactivateAPuzzle}> Reactivate</Button> : null}
                    </div>
                </CardFooter>
            </Card >

        </>
    )

}
export default Puzzle;