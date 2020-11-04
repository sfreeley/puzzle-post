import React, { useContext, useEffect, useState } from "react";
import { RequestContext } from "../../providers/RequestProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import Request from "./Request";
import "./styles/OutgoingRequestList.css";

const OutgoingRequestList = () => {
    const { getAllOutgoingRequests, outgoingRequests } = useContext(RequestContext);
    const { activeUser } = useContext(UserProfileContext);
    const [pending, setPending] = useState([]);
    const [accepted, setAccepted] = useState([]);
    const [rejected, setRejected] = useState([]);

    useEffect(() => {
        getAllOutgoingRequests(parseInt(activeUser.id));
    }, []);

    useEffect(() => {
        pendingRequestsCount();
        acceptedRequestCount();
        rejectedRequestCount();
    }, [outgoingRequests])

    const pendingRequestsCount = () => {
        setPending(outgoingRequests.filter(outgoingRequest => outgoingRequest.statusId === 1))
    }

    const acceptedRequestCount = () => {
        setAccepted(outgoingRequests.filter(outgoingRequest => outgoingRequest.statusId === 2))
    }

    const rejectedRequestCount = () => {
        setRejected(outgoingRequests.filter(outgoingRequest => outgoingRequest.statusId === 3))
    }

    return (
        <div className="container">
            <div className="row justify-content-center">

                <div className="cards-column">
                    {outgoingRequests.length === 0 ? <p>You don't have any puzzle request history</p> :
                        <div className="requestStats">
                            You have {outgoingRequests.length} puzzle requests in your history
                            , <strong>{pending.length}</strong> pending request(s)
                            , <strong>{accepted.length}</strong> accepted request(s)
                            , and <strong>{rejected.length}</strong> rejected request(s).

                        {outgoingRequests.map((request) => {
                            return <Request key={request.id} request={request} />
                        })}
                        </div>

                    }

                </div>
            </div>
        </div>
    )
}
export default OutgoingRequestList;