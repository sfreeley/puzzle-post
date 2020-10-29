import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const CommentContext = React.createContext();

export function CommentProvider(props) {
    const { getToken } = useContext(UserProfileContext);
    const [allComments, setAllComments] = useState([]);
    const [comments, setComments] = useState([]);

    const getComments = () => {
        return getToken().then((token) => {
            fetch("/api/comment", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()).then(resp => setComments(resp))
        })
    };

    const getAllCommentsForPuzzle = (id) => {
        return getToken().then((token) => {
            fetch(`/api/comment/getallcommentsbypuzzle/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()).then(setAllComments);
        })
    };

    const addComment = (newComment) => {
        return getToken().then((token) => {
            fetch("/api/comment/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newComment)
            })
        })
    };















    return (

        <CommentContext.Provider value={{ getAllCommentsForPuzzle, allComments, getComments, comments, addComment }}>
            {props.children}
        </CommentContext.Provider>
    );
}