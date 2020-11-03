import React, { useContext, useState } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { currentDateTime } from "../helperFunctions";
import "../../images/puzzlepostlogo.png"


const Home = () => {
    const { activeUser } = useContext(UserProfileContext);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleString())

    let time = new Date();
    if (time.getHours() < 12) {
        return (
            <>
                <div style={{
                    position: "relative",
                    left: 0,
                    right: 0,
                    top: "50%",
                    marginTop: "-0.5rem",
                    textAlign: "center",
                }}>Hello, Good Morning {activeUser.displayName}
                    <p>{currentDateTime(currentTime)}</p>

                </div>


                <div>
                    <img src={require("../../images/puzzlepostlogo.png")} alt="puzzleLogo" />
                    <p>Welcome to PuzzlePost! Peruse the puzzle list and request a puzzle you deem worthy! First come, first serve!
                    Wait for the current owner of the puzzle to approve or deny your request. Keep track of all your requests in your puzzle request history.
                    Once you're done with the puzzle, be kind, and reactivate so that others can share in the fun!
                    </p>
                </div>




            </>

        );
    }
    else if ((time.getHours() < 18 && time.getHours() >= 12)) {
        return (
            <>
                <div style={{
                    position: "relative",
                    left: 0,
                    right: 0,
                    top: "50%",
                    marginTop: "-0.5rem",
                    textAlign: "center",
                }}>Hello, Good Afternoon {activeUser.displayName}
                    <p>{currentDateTime(currentTime)}</p>
                </div>

                <div>
                    <img src={require("../../images/puzzlepostlogo.png")} alt="puzzleLogo" />
                    <p>Welcome to PuzzlePost! Peruse the puzzle list and request a puzzle you deem worthy! First come, first serve!
                    Wait for the current owner of the puzzle to approve or deny your request. Keep track of all your requests in your puzzle request history.
                    Once you're done with the puzzle, be kind, and reactivate so that others can share in the fun!
                    </p>
                </div>

            </>
        );
    }
    else {
        return (
            <>
                <div style={{
                    position: "relative",
                    left: 0,
                    right: 0,
                    top: "50%",
                    marginTop: "-0.5rem",
                    textAlign: "center",
                }}>Hello, Good Evening {activeUser.displayName}
                    <p>{currentDateTime(currentTime)}</p>
                </div>

                <div>
                    <img src={require("../../images/puzzlepostlogo.png")} alt="puzzleLogo" />
                    <p>Welcome to PuzzlePost! Peruse the puzzle list and request a puzzle you deem worthy! First come, first serve!
                    Wait for the current owner of the puzzle to approve or deny your request. Keep track of all your requests in your puzzle request history.
                    Once you're done with the puzzle, be kind, and reactivate so that others can share in the fun!
                    </p>
                </div>

            </>
        );

    }
}
export default Home;