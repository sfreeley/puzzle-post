import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const RequestContext = React.createContext();

export function RequestProvider(props) {
    const { getToken } = useContext(UserProfileContext);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [outgoingRequests, setOutgoingRequests] = useState([]);

    const getAllPendingRequests = (id) => {
        return getToken().then((token) => {
            fetch(`/api/request/incoming/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()).then(resp => setPendingRequests(resp))
        })
    };

    const getAllOutgoingRequests = (id) => {
        return getToken().then((token) => {
            fetch(`/api/request/outgoing/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()).then(resp => setOutgoingRequests(resp))
        })
    };

    return (

        <RequestContext.Provider value={{ getAllPendingRequests, pendingRequests, getAllOutgoingRequests, outgoingRequests }}>
            {props.children}
        </RequestContext.Provider>
    );

}