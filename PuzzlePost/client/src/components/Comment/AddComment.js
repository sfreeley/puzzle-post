import React from "react";
import { Form, FormGroup, Label, Input, Button, Col, UncontrolledPopover } from "reactstrap";

const AddComment = ({ toggleAdd, newComment, popoverOpen, handleFieldChange, addNewComment, cancelAdd }) => {

    return (
        <>
            {/* <Col sm="12" md={{ size: 6, offset: 3 }}> */}
            <UncontrolledPopover trigger="click" placement="top" target="addComment">

                <FormGroup>
                    <Label htmlFor="title"><strong>Title</strong></Label>
                    <Input className="p-2 bd-highlight justify-content-center"
                        value={newComment && newComment.title}
                        onChange={handleFieldChange}
                        type="text"
                        name="title"
                        id="title"
                        required=""
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="content"><strong>What are you thinking?</strong></Label>
                    <Input className="p-2 bd-highlight justify-content-center"
                        value={newComment && newComment.content}
                        onChange={handleFieldChange}
                        type="textarea"
                        name="content"
                        id="content"
                        required=""
                    />
                </FormGroup>
                <Button block className="submitComment" type="button" color="secondary" id="addComment" onClick={addNewComment}>
                    {'Save Comment'}
                </Button>
                <Button block className="Cancel" type="button" color="secondary" id="addComment" onClick={cancelAdd}>
                    {'Cancel'}
                </Button>
            </UncontrolledPopover>
            {/* </Col> */}
        </>
    )

};

export default AddComment;