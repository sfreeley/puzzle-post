import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const RequestContext = React.createContext();

export function RequestProvider(props) {
    const { getToken } = useContext(UserProfileContext);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [outgoingRequests, setOutgoingRequests] = useState([]);
    const [rejectedRequests, setRejectedRequests] = useState([]);

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

    const getAllRejectedRequests = (id) => {
        debugger;
        return getToken().then((token) => {
            fetch(`/api/request/rejection/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()).then(resp => setRejectedRequests(resp))
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

    const addRequestDeactivatePuzzle = (request) => {
        return getToken().then((token) => fetch("/api/request/requestwithdeactivation", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request)
        })

        )
    };

    const updateRejection = (request) => {
        return getToken().then((token) => fetch(`/api/request/rejection/${request.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request)
        })

        )
    };

    const deleteRequest = (id) => {
        return getToken().then((token) => {
            fetch(`/api/request/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        })
    }

    return (

        <RequestContext.Provider value={{ getAllRejectedRequests, rejectedRequests, deleteRequest, updateRejection, addRequestDeactivatePuzzle, getAllPendingRequests, setPendingRequests, pendingRequests, getAllOutgoingRequests, setOutgoingRequests, outgoingRequests }}>
            {props.children}
        </RequestContext.Provider>
    );

}