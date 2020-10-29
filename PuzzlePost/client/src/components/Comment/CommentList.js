import React, { useContext, useEffect } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import { PuzzleContext } from "../../providers/PuzzleProvider";
import Comment from "./Comment";
import { Col, Row, Button } from "reactstrap";
import { Link, useParams } from "react-router-dom";

const CommentList = () => {
    const { allComments, getAllCommentsForPuzzle } = useContext(CommentContext);
    const { getPuzzleWithoutHistoryById, aPuzzle } = useContext(PuzzleContext);
    const { id } = useParams();

    useEffect(() => {
        getAllCommentsForPuzzle(id);
        getPuzzleWithoutHistoryById(id);
    }, []);

    return (
        <>
            <h5> Comments for <strong><em>{aPuzzle.title}</em></strong></h5>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
                <Row className="justify-content-center">
                </Row>
                {allComments.length === 0 ? <p>There are currently no comments for this post</p> :
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="cards-column">
                                {allComments && allComments.map((comment) => {
                                    return (
                                        <Comment key={comment.id} comment={comment} />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                }
            </Col>
        </>
    );
};

export default CommentList;