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
    NavLink
} from 'reactstrap';

const Header = () => {
    const { isLoggedIn, logout, activeUser } = useContext(UserProfileContext);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (
        <>
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand tag={RRNavLink} to="/">Puzzle Post</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            { /* When isLoggedIn === true, we will render the Home link */}
                            {isLoggedIn &&
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/">Home</NavLink>
                                </NavItem>
                            }
                            {isLoggedIn ?
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/puzzle">Shared Puzzle List</NavLink>
                                </NavItem> : null
                            }
                            {isLoggedIn &&
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/puzzle/user">Your Puzzle List</NavLink>
                                </NavItem>
                            }
                            {/* {isLoggedIn &&
                  <NavItem>
                    <NavLink tag={RRNavLink} to="/post/User">Incoming Requests</NavLink>
                  </NavItem>
                } */}

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
            </div>
        </>
    )

}
export default Header;