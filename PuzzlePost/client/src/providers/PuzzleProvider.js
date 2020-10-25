import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PuzzleContext = React.createContext();

export function PuzzleProvider(props) {
    const { getToken } = useContext(UserProfileContext);
    const [activePuzzles, setActivePuzzles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [userPuzzles, setUserPuzzles] = useState([]);

    const getAllActivePuzzles = () => {
        return getToken().then((token) => {
            fetch("/api/puzzle/active", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()).then(resp => setActivePuzzles(resp))
        })
    };

    const addPuzzle = (puzzle) => {

        getToken().then((token) => fetch("/api/puzzle", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(puzzle)
        })
            // .then(resp => {
            //     if (resp.ok) {
            //         return resp.json();
            //     }
            //     throw new Error("Unauthorized");
            // })
        )
    };

    const categoriesForPuzzle = () => {
        getToken().then((token) => fetch("/api/puzzle/category", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => res.json()).then(setCategories)
        );
    };

    const getAllPuzzlesByUser = (id) => {
        getToken().then((token) => fetch(`/api/puzzle/user/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => res.json()).then(setUserPuzzles)
        );

    }



    return (

        <PuzzleContext.Provider value={{ userPuzzles, getAllPuzzlesByUser, getAllActivePuzzles, activePuzzles, addPuzzle, categoriesForPuzzle, categories }}>
            {props.children}
        </PuzzleContext.Provider>
    );
}