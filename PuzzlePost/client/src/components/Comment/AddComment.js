import React from "react";
import { Form, FormGroup, Label, Input, Button, Col } from "reactstrap";

const AddComment = ({ newComment, openForm, handleFieldChange, addNewComment, cancelAdd }) => {

    return (
        <>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
                <Form hidden={openForm}>
                    <h3> Add A Comment </h3>
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
                    <Button block className="submitComment" type="button" color="secondary" onClick={addNewComment}>
                        {'Save Comment'}
                    </Button>
                    <Button block className="Cancel" type="button" color="secondary" onClick={cancelAdd}>
                        {'Cancel'}
                    </Button>
                </Form >
            </Col>
        </>
    )

};

export default AddComment;
