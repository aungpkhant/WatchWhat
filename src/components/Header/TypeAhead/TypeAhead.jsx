import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { TMDB_QUERY_LINK } from "../../../api/constants";
import { setSearchResults } from "../../../redux/actions";
import Axios from "axios";
import history from "../../../util/history";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./TypeAhead.css";

export default function TypeAhead() {
    const dispatch = useDispatch();

    const [typeAhead, setTypeAhead] = useState({
        loading: false,
        options: [],
    });

    const handleSearchSubmit = (query) => {
        let navigationPath = `/search?=${query}`;
        history.push(navigationPath);
    };

    return (
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
                            dispatch(setSearchResults(searchResults))
                        )
                    );
            }}
            options={typeAhead.options}
        />
    );
}
