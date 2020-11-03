import React, { useContext, useEffect } from "react";
import { PuzzleContext } from "../../providers/PuzzleProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Button, CardDeck, Container, Row, Col } from "reactstrap";
import Puzzle from "./Puzzle";
import { Link, useHistory } from "react-router-dom";
import InProgressList from "./InProgressList";
import { FaPuzzlePiece } from 'react-icons/fa';
import "./styles/UserPuzzleList.css";

const UserPuzzleList = () => {
    const { userPuzzles, getAllPuzzlesByUser } = useContext(PuzzleContext);
    const { activeUser } = useContext(UserProfileContext);
    const history = useHistory();

    const addNewPuzzle = () => {
        history.push("/puzzle/add")
    }

    useEffect(() => {
        getAllPuzzlesByUser(parseInt(activeUser.id));
    }, []);

    return (

        <div className="userWithInProgressCards--container">
            <div className="addPuzzleButton--container">
                <Button onClick={addNewPuzzle}><FaPuzzlePiece size={40} /> Add New Puzzle</Button>
            </div>
            <Container >
                <h4>My Active Puzzles</h4>
                <CardDeck>

                    <>

                        {userPuzzles.length === 0 ? <p>No puzzles currently being shared</p> :
                            userPuzzles.map((puzzle) => (
                                <Puzzle key={puzzle.id} puzzle={puzzle} />
                            ))
                        }
                    </>

                </CardDeck>
                <h6>In Progress Puzzles</h6>
                <Row>
                    <InProgressList />
                </Row>
            </Container>

        </div >

    );
};

export default UserPuzzleList;