import React, { useState } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink as RSNavLink,
    Input,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import "./Header.css";

// TODO fix double <a> tags error
const Header = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar dark expand="md">
                <NavbarBrand>
                    <NavLink to="/">WatchWhat</NavLink>
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <RSNavLink>
                                <NavLink to="/trending">Trending</NavLink>
                            </RSNavLink>
                        </NavItem>
                        <NavItem>
                            <RSNavLink>
                                <NavLink to="/upcoming">Upcoming</NavLink>
                            </RSNavLink>
                        </NavItem>
                        <Input placeholder="Search" />
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default Header;
