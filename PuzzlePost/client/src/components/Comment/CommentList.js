import React, { useContext, useEffect, useState } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import { PuzzleContext } from "../../providers/PuzzleProvider";
import Comment from "./Comment";
import { Col, Row, Button, Card } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import PuzzleDetails from "../Puzzle/PuzzleDetails";
import "./styles/CommentList.css";


const CommentList = () => {
    const { allComments, getAllCommentsForPuzzle } = useContext(CommentContext);
    const { getPuzzleWithoutHistoryById, aPuzzle } = useContext(PuzzleContext);
    const { id } = useParams();

    useEffect(() => {

        getAllCommentsForPuzzle(id);
    }, []);


    return (


        <>

            { allComments && allComments.map((aComment) => {
                return (
                    <Comment key={aComment.id} aComment={aComment} />
                )

            })}



        </>

    );
};

export default CommentList;