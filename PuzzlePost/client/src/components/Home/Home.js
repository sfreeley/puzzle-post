import React, { useContext, useState } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { currentDateTime } from "../helperFunctions";

const Home = () => {
    const { activeUser } = useContext(UserProfileContext);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleString())

    return (
        <>
            <h4>Hello, {activeUser.displayName}.</h4>
            <h6>{currentDateTime(currentTime)}</h6>
        </>
    )

}
export default Home;