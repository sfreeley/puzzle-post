import React, { useState, useContext } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Jumbotron
} from 'reactstrap';
import "./Header.css";
import Home from "./Home/Home";

const Header = () => {
    const { isLoggedIn, logout, activeUser } = useContext(UserProfileContext);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (


        <>

            {isLoggedIn &&
                <Home />
            }
            <Navbar className="nav-bar--banner" color="light" light expand="md" sticky="sticky">

                <Jumbotron   >
                    {/* <img src={'https://cdn.pixabay.com/photo/2013/07/12/18/03/jigsaw-puzzle-152865_1280.png'} alt="puzzle-banner" /> */}
                    {/* <Container fluid> */}


                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            { /* When isLoggedIn === true, we will render the Home link */}
                            {isLoggedIn &&
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/">Home</NavLink>
                                </NavItem>
                            }
                            {isLoggedIn &&

                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/puzzle">Puzzle List</NavLink>
                                </NavItem>
                            }
                            {isLoggedIn &&
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/puzzle/user">My Puzzle List</NavLink>
                                </NavItem>
                            }
                            {isLoggedIn &&
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/request/incoming">Incoming Requests</NavLink>
                                </NavItem>
                            }
                            {isLoggedIn &&
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/request/outgoing">Your Puzzle Request History</NavLink>
                                </NavItem>
                            }


                        </Nav>

                        <Nav navbar>
                            {isLoggedIn &&
                                <>
                                    <NavItem>
                                        <button aria-current="page" className="nav-link"
                                            style={{ cursor: "pointer" }} onClick={logout}>Logout</button>
                                    </NavItem>
                                </>
                            }
                            {!isLoggedIn &&
                                <>
                                    <NavItem>
                                        <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                                    </NavItem>
                                </>
                            }
                        </Nav>
                    </Collapse>
                    {/* </Container> */}
                </Jumbotron>
            </Navbar>

        </>
    )

}
export default Header;