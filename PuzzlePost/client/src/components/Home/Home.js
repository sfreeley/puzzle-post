import React, { useContext, useState } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { currentDateTime } from "../helperFunctions";
import { Card, CardBody } from "reactstrap";
import Time from "../Time/Time";
import "./styles/Home.css";

const Home = () => {

    let time = new Date();
    if (time.getHours() < 12) {
        return (
            <>
                <Time />
                <div className="home--container">
                    <div className="logo--container">
                        <img src="./images/puzzlepostlogo.png" alt="puzzleLogo" />
                    </div>
                    <div className="appDescription">
                        <p className="appDescription--cardBody" >Welcome to PuzzlePost! Peruse the puzzle list and request a puzzle you deem worthy! First come, first serve!
                        Wait for the current owner of the puzzle to approve or deny your request. Keep track of all your requests in your puzzle request history.
                        Once you're done with the puzzle, be kind, and reactivate so that others can share in the fun!
                        </p>
                    </div>
                </div>
            </>

        );
    }
    else if ((time.getHours() < 18 && time.getHours() >= 12)) {
        return (
            <>
                <Time />
                <div className="home--container">
                    <div className="logo--container">
                        <img src="./images/puzzlepostlogo.png" alt="puzzleLogo" />
                    </div>
                    <div className="appDescription">
                        <div className="appDescription--cardBody">Welcome to PuzzlePost! Peruse the puzzle list and request a puzzle you deem worthy! First come, first serve!
                        Wait for the current owner of the puzzle to approve or deny your request. Keep track of all your requests in your puzzle request history.
                        Once you're done with the puzzle, be kind, and reactivate so that others can share in the fun!
                        </div>
                    </div>

                </div>
            </>
        );
    }
    else {
        return (
            <>
                <Time />
                <div className="home--container">
                    <div className="logo--container">
                        <img src="./images/puzzlepostlogo.png" alt="puzzleLogo" />
                    </div>
                    <div className="appDescription">
                        <div className="appDescription--cardBody">Welcome to PuzzlePost! Peruse the puzzle list and request a puzzle you deem worthy! First come, first serve!
                        Wait for the current owner of the puzzle to approve or deny your request. Keep track of all your requests in your puzzle request history.
                        Once you're done with the puzzle, be kind, and reactivate so that others can share in the fun!
                        </div>
                    </div>
                </div>
            </>
        );

    }
}
export default Home;