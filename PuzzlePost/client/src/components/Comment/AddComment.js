import React from "react";
import { Form, FormGroup, Label, Input, Button, UncontrolledPopover } from "reactstrap";
import "./styles/AddComment.css";

const AddComment = ({ newComment, handleFieldChange, addNewComment, cancelAdd }) => {

    return (
        <>

            <UncontrolledPopover trigger="click" placement="top" target="addComment">
                <Form>
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
                        {'Save'}
                    </Button>
                    <Button block className="cancelComment" type="button" color="secondary" id="addComment" onClick={cancelAdd}>
                        {'Cancel'}
                    </Button>
                </Form>
            </UncontrolledPopover>

        </>
    )

};

export default AddComment;