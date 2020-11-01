import React, { useContext, useEffect, useState } from "react";
import { RequestContext } from "../../providers/RequestProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import Request from "./Request";
import { Button } from "reactstrap";


const IncomingRequestList = () => {
    const { getAllPendingRequests, pendingRequests } = useContext(RequestContext);
    const { activeUser } = useContext(UserProfileContext);


    useEffect(() => {
        getAllPendingRequests(parseInt(activeUser.id));
    }, []);


    return (
        <div className="container">
            <div className="row justify-content-center">

                <div className="cards-column">
                    {pendingRequests.length === 0 ? <p>You don't have any new pending puzzle requests</p> :
                        pendingRequests.map((request) => {
                            return <Request key={request.id} request={request} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default IncomingRequestList;