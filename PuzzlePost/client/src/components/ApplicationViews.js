import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import PuzzleList from "./Puzzle/PuzzleList";
import AddPuzzle from "./Puzzle/AddPuzzle";
import UserPuzzleList from "./Puzzle/UserPuzzleList";
import PuzzleDetails from "./Puzzle/PuzzleDetails";
import EditPuzzle from "./Puzzle/EditPuzzle";
import IncomingRequestList from "./Request/IncomingRequestList";


export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <main>
            <Switch>
                {/* <Route path="/" exact>
                    {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
                </Route> */}
                <Route path="/request/incoming" exact>
                    {isLoggedIn ? <IncomingRequestList /> : <Redirect to="/login" />}
                </Route>
                <Route path="/puzzle/edit/:id" exact>
                    {isLoggedIn ? <EditPuzzle /> : <Redirect to="/login" />}
                </Route>
                <Route path="/puzzle/details/:id" exact>
                    {isLoggedIn ? <PuzzleDetails /> : <Redirect to="/login" />}
                </Route>
                <Route path="/puzzle/user" exact>
                    {isLoggedIn ? <UserPuzzleList /> : <Redirect to="/login" />}
                </Route>
                <Route path="/puzzle" exact>
                    {isLoggedIn ? <PuzzleList /> : <Redirect to="/login" />}
                </Route>
                <Route path="/puzzle/add" exact>
                    {isLoggedIn ? <AddPuzzle /> : <Redirect to="/login" />}
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
            </Switch>
        </main>
    );
};
