import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import { RequestContext } from "../../providers/RequestProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";


const PuzzleRejection = ({ modal, toggle, request, rejectRequest }) => {


    return (
        <div>

            <Modal isOpen={modal} toggle={toggle} className="rejection">
                <ModalHeader toggle={toggle}>Please confirm</ModalHeader>
                <ModalBody>
                    <Form className="rejectionForm">
                        <FormGroup>
                            Are you sure you want to deny this puzzle request?
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={rejectRequest}>Reject</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Just Kidding</Button>
                </ModalFooter>
            </Modal>
        </div>

    )
}

export default PuzzleRejection;

