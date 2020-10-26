import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PuzzleContext = React.createContext();

export function PuzzleProvider(props) {
    const { getToken } = useContext(UserProfileContext);
    const [activePuzzles, setActivePuzzles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [userPuzzles, setUserPuzzles] = useState([]);
    const [inactiveUserPuzzles, setInactiveUserPuzzles] = useState([]);
    const [puzzle, setPuzzle] = useState({ userProfile: {}, category: {}, histories: [] });
    const [aPuzzle, setAPuzzle] = useState({ category: {} });

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

        getToken().then((token) => fetch("/api/puzzle/puzzlewithhistory", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(puzzle)
        })

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

    };

    const getAllInactivePuzzlesByUser = (id) => {
        getToken().then((token) => fetch(`/api/puzzle/user/inactive/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => res.json()).then(setInactiveUserPuzzles)
        );

    };

    //getting puzzle with history
    const getPuzzleById = (id) => {
        getToken().then((token) => fetch(`/api/puzzle/history/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => res.json()).then(setPuzzle)
        )

    };

    //getting without history
    const getPuzzleWithoutHistoryById = (id) => {
        getToken().then((token) => fetch(`/api/puzzle/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => res.json()).then(setAPuzzle)
        )

    };

    const editPuzzle = (puzzle) => {
        getToken().then((token) => fetch(`/api/puzzle/${puzzle.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(puzzle)
        })
        )
    };

    const reactivatePuzzle = (id) => {
        getToken().then((token) => fetch(`/api/puzzle/reactivate/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }

        })
        )
    };

    const deactivatePuzzle = (id) => {
        getToken().then((token) => fetch(`/api/puzzle/deactivate/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
        )
    };


    return (

        <PuzzleContext.Provider value={{ deactivatePuzzle, reactivatePuzzle, aPuzzle, editPuzzle, puzzle, userPuzzles, inactiveUserPuzzles, getPuzzleWithoutHistoryById, getPuzzleById, getAllInactivePuzzlesByUser, getAllPuzzlesByUser, getAllActivePuzzles, activePuzzles, addPuzzle, categoriesForPuzzle, categories }}>
            {props.children}
        </PuzzleContext.Provider>
    );
}