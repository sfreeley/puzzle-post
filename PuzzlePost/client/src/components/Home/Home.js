import React from "react";
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
                        Once you're done with the puzzle, be kind, and reactivate so that others can share in the fun! If you are looking for specific puzzles, use
                        the search function and search by: title, manufacturer, number of pieces, category, or current owner.
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
                        Once you're done with the puzzle, be kind, and reactivate so that others can share in the fun! If you are looking for specific puzzles, use
                        the search function and search by: title, manufacturer, number of pieces, category, or current owner.
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
                        Once you're done with the puzzle, be kind, and reactivate so that others can share in the fun! If you are looking for specific puzzles, use
                        the search function and search by: title, manufacturer, number of pieces, category, or current owner.
                        </div>
                    </div>
                </div>
            </>
        );

    }
}
export default Home;