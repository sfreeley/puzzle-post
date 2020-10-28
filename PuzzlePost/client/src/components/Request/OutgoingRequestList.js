import React, { useContext, useEffect, useState } from "react";
import { RequestContext } from "../../providers/RequestProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import Request from "./Request";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

const OutgoingRequestList = () => {
    const { getAllOutgoingRequests, outgoingRequests } = useContext(RequestContext);
    const { activeUser } = useContext(UserProfileContext);


    useEffect(() => {
        getAllOutgoingRequests(parseInt(activeUser.id));
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <h5>Puzzle Request History</h5>
                <div className="cards-column">
                    {outgoingRequests.length == 0 ? <p>You don't have any puzzle request history</p> :
                        outgoingRequests.map((request) => {
                            return <Request key={request.id} request={request} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default OutgoingRequestList;