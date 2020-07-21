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
import { useDispatch } from "react-redux";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { TMDB_QUERY_LINK } from "../../api/constants";
import { setSearchResults } from "../../redux/actions";
import Axios from "axios";
import history from "../../util/history";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./Header.css";

// TODO fix double <a> tags error
const Header = (props) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [typeAhead, setTypeAhead] = useState({
        loading: false,
        options: [],
    });

    const handleSearchSubmit = (query) => {
        let navigationPath = `${process.env.PUBLIC_URL}/search?=${query}`;
        history.push(navigationPath);
    };

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar dark expand="md">
                <NavLink className="header-brand" to="/">
                    WatchWhat
                </NavLink>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink to="/trending">Trending</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/upcoming">Upcoming</NavLink>
                        </NavItem>
                        <AsyncTypeahead
                            id="Search Typeahead"
                            isLoading={typeAhead.loading}
                            labelKey={(option) => `${option.title}`}
                            placeholder="Search Movie..."
                            onKeyDown={(e) => {
                                if (e.keyCode === 13) {
                                    handleSearchSubmit(e.target.value);
                                }
                            }}
                            onSearch={(query) => {
                                setTypeAhead({
                                    ...typeAhead,
                                    loading: true,
                                });
                                Axios.get(TMDB_QUERY_LINK(query))
                                    .then((resp) => {
                                        console.log(resp.data.results);
                                        return resp.data.results;
                                    })
                                    .then((searchResults) =>
                                        setTypeAhead(
                                            {
                                                loading: false,
                                                options: searchResults,
                                            },
                                            dispatch(
                                                setSearchResults(searchResults)
                                            )
                                        )
                                    );
                            }}
                            options={typeAhead.options}
                        />
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default Header;
