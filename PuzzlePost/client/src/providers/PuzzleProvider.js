import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PuzzleContext = React.createContext();

export function PuzzleProvider(props) {
    const { getToken } = useContext(UserProfileContext);
    const [activePuzzles, setActivePuzzles] = useState([]);

    const getAllActivePuzzles = () => {
        return getToken().then((token) => {
            fetch("/api/puzzle/active", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()).then(resp => setActivePuzzles(resp))
        })
    }

    // const getAllActivePuzzles = () => {

    //     return fetch("/api/puzzle/active").then(resp => resp.json()).then(setActivePuzzles)

    // }

    return (

        <PuzzleContext.Provider value={{ getAllActivePuzzles, activePuzzles }}>
            {props.children}
        </PuzzleContext.Provider>
    );
}