import React, { useContext, useEffect, useState } from "react";
import { RequestContext } from "../../providers/RequestProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import Request from "./Request";
import "./styles/OutgoingRequestList.css";

const IncomingRequestList = () => {
    const { getAllPendingRequests, pendingRequests } = useContext(RequestContext);
    const { activeUser } = useContext(UserProfileContext);
    const [pending, setPending] = useState([]);

    useEffect(() => {
        getAllPendingRequests(parseInt(activeUser.id));
    }, []);

    useEffect(() => {
        pendingRequestsCount();
    }, [pendingRequests])

    const pendingRequestsCount = () => {
        setPending(pendingRequests.filter(pendingRequest => pendingRequest.statusId === 1))
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="pendingRequestsList--container">
                    <div className="requestStats">
                        You have <strong>{pending.length}</strong> puzzle requests in your inbox.
                        {
                            pendingRequests.map((request) => {
                                return <Request key={request.id} request={request} />
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default IncomingRequestList;


