import React, { useContext, useEffect, useState } from "react";
import { RequestContext } from "../../providers/RequestProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import Request from "./Request";

const OutgoingRequestList = () => {
    const { getAllOutgoingRequests, outgoingRequests } = useContext(RequestContext);
    const { activeUser } = useContext(UserProfileContext);

    useEffect(() => {
        getAllOutgoingRequests(parseInt(activeUser.id));
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">

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