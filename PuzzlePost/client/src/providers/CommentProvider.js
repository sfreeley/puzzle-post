import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const CommentContext = React.createContext();

export function CommentProvider(props) {
    const { getToken } = useContext(UserProfileContext);
    const [allComments, setAllComments] = useState([]);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState({})

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

    const getCommentById = (commentId) => {
        return getToken().then((token) => {
            fetch(`/api/comment/${commentId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()).then(setComment)
        })
    };

    const editComment = (comment) => {
        return getToken().then((token) => {
            fetch(`/api/comment/${comment.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(comment)
            })
        })
    };

    const deleteComment = (commentId) => {
        return getToken().then((token) => {
            fetch(`/api/comment/${commentId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        })
    }

    return (

        <CommentContext.Provider value={{ getAllCommentsForPuzzle, allComments, getComments, comments, addComment, editComment, getCommentById, comment, deleteComment }}>
            {props.children}
        </CommentContext.Provider>
    );
}