import React, { useContext, useState } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { currentDateTime } from "../helperFunctions";

const Time = () => {
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
                    fontSize: "1.5rem"
                }}>Hello, Good Morning {activeUser.displayName}
                    <p>{currentDateTime(currentTime)}</p>

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

            </>
        );

    }
}
export default Time;