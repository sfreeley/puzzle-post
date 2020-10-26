import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const HistoryContext = React.createContext();

export function HistoryProvider(props) {
    const { getToken } = useContext(UserProfileContext);

    const addHistory = (history, id) => {

        getToken().then((token) => fetch(`/api/history/puzzlewithhistory/${id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(history)
        }).catch((err) => console.log(err))

        )
    };

    return (

        <HistoryContext.Provider value={{ addHistory }}>
            {props.children}
        </HistoryContext.Provider>
    );
}
