import React, { useContext, useEffect, useState } from "react";
import { RequestContext } from "../../providers/RequestProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import Request from "./Request";
import { Button } from "reactstrap";
import { NavLink } from "react-router-dom";

const OutgoingRequestList = () => {
    const { getAllOutgoingRequests, outgoingRequests } = useContext(RequestContext);
    const { activeUser } = useContext(UserProfileContext);


    useEffect(() => {
        getAllOutgoingRequests(parseInt(activeUser.id));
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <h5>Outgoing Puzzle Requests</h5>
                <div className="cards-column">
                    {outgoingRequests.map((request) => {
                        return <Request key={request.id} request={request} />
                    })}
                </div>
            </div>
        </div>
    )
}
export default OutgoingRequestList;