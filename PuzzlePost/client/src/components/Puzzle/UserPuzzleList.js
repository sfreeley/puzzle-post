import React, { useContext, useEffect } from "react";
import { PuzzleContext } from "../../providers/PuzzleProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Button, CardDeck, Container, Row, Col } from "reactstrap";
import Puzzle from "./Puzzle";
import { Link, useHistory } from "react-router-dom";
import InProgressList from "./InProgressList";

const UserPuzzleList = () => {
    const { userPuzzles, getAllPuzzlesByUser } = useContext(PuzzleContext);
    const { activeUser } = useContext(UserProfileContext);
    const history = useHistory();

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // useEffect(() => {
    //     sleep(300).then(() => {

    //         getAllInactivePuzzlesByUser(parseInt(activeUser.id));
    //     })
    // }, []);
    const addNewPuzzle = () => {
        history.push("/puzzle/add")
    }

    useEffect(() => {
        getAllPuzzlesByUser(parseInt(activeUser.id));
    }, []);

    return (

        <div>
            <Button onClick={addNewPuzzle}>New Puzzle</Button>

            <Container >
                <Col xs="4">

                    <>

                        {userPuzzles.map((puzzle) => (
                            <Puzzle key={puzzle.id} puzzle={puzzle} />
                        ))}
                    </>


                </Col>
                <Row>
                    <InProgressList />
                </Row>
            </Container>

        </div>

    );
};

export default UserPuzzleList;