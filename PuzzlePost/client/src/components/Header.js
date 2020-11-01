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

const Header = () => {
    const { isLoggedIn, logout, activeUser } = useContext(UserProfileContext);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (


        <>


            <Navbar className="nav-bar--banner" color="light" light expand="md" sticky="sticky">
                <Jumbotron  >
                    {/* <Container fluid> */}
                    {/* <img src={'https://cdn.pixabay.com/photo/2020/05/19/10/52/banner-5190182_1280.jpg'} alt="puzzle-banner" /> */}

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
                                        <a aria-current="page" className="nav-link"
                                            style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
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