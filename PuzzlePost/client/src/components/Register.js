import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import "./Register.css";

export default function Register() {
    const history = useHistory();
    const { register } = useContext(UserProfileContext);

    const [displayName, setDisplayName] = useState();
    const [email, setEmail] = useState();
    //need to add this to a field
    const [imageLocation, setImageLocation] = useState(" ");
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const registerClick = (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            alert("Passwords don't match. Do better.");
        } else {
            const userProfile = { displayName, email, imageLocation };
            register(userProfile, password)
                .then(() => history.push("/"));
        }
    };

    return (
        <div register--container>
            <div className="puzzleLogoImage--container">
                <img className="puzzleLogo--image" src="./images/puzzlepostlogo.png" alt="puzzleLogo" />
            </div>
            <Form className="registerForm--container" onSubmit={registerClick}>
                <fieldset>
                    <FormGroup>
                        <Label htmlFor="displayName">Username</Label>
                        <Input id="displayName" type="text" onChange={e => setDisplayName(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="confirmPassword">Confirm Password</Label>
                        <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="registerSubmitButton--formGroup">
                        <Button>Register</Button>
                    </FormGroup>
                </fieldset>
            </Form>
        </div>
    );
}