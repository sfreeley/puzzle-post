import React, { useState, useContext } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import "./Header.css";

const Header = () => {
    const { isLoggedIn, logout } = useContext(UserProfileContext);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (

        <>
            <Navbar className="nav-bar--banner" color="faded" light expand="md">
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        { /* When isLoggedIn === true, we will render the Home link */}
                        {isLoggedIn &&
                            <NavItem>
                                <NavLink tag={RRNavLink} to="/"><img src="https://img.icons8.com/clouds/100/000000/heart-puzzle.png" alt="heartPuzzlePiece" /> Home </NavLink>
                            </NavItem>
                        }
                        {isLoggedIn &&

                            <NavItem>
                                <NavLink tag={RRNavLink} to="/puzzle"> <img src="https://img.icons8.com/clouds/100/000000/todo-list.png" alt="listIcon" /> Puzzle List</NavLink>
                            </NavItem>
                        }
                        {isLoggedIn &&
                            <NavItem>
                                <NavLink tag={RRNavLink} to="/puzzle/user"><img src="https://img.icons8.com/clouds/100/000000/search-in-list.png" alt="listIcon" /> My Puzzle List  </NavLink>
                            </NavItem>
                        }
                        {isLoggedIn &&
                            <NavItem>
                                <NavLink tag={RRNavLink} to="/request/incoming"><img src="https://img.icons8.com/clouds/100/000000/important-mail.png" alt="mailbox" /> Incoming Requests </NavLink>
                            </NavItem>
                        }
                        {isLoggedIn &&
                            <NavItem>
                                <NavLink tag={RRNavLink} to="/request/outgoing"> <img src="https://img.icons8.com/clouds/100/000000/mailbox-closed-flag-down.png" alt="mail" /> My Puzzle Request History </NavLink>
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

            </Navbar>

        </>
    )

}
export default Header;