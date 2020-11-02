import React, { useContext, useEffect, useState } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import { PuzzleContext } from "../../providers/PuzzleProvider";
import Comment from "./Comment";
import { Col, Row, Button, Card } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import "./styles/CommentList.css";


const CommentList = () => {
    const { allComments, getAllCommentsForPuzzle, getCommentById } = useContext(CommentContext);
    const { getPuzzleWithoutHistoryById, aPuzzle } = useContext(PuzzleContext);
    const { id } = useParams();

    useEffect(() => {
        getPuzzleWithoutHistoryById(id);
        getAllCommentsForPuzzle(id);
    }, []);


    return (


        <>


            { allComments && allComments.map((comment) => {
                return (
                    <Comment key={comment.id} comment={comment} />
                )
            })}

        </>

    );
};

export default CommentList;