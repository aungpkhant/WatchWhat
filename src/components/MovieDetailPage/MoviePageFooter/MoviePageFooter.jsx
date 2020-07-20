import React from "react";
import styles from "./MoviePageFooter.module.css";
import { useRouteMatch, NavLink } from "react-router-dom";

export default function MoviePageFooter() {
    let { url } = useRouteMatch();

    return (
        <div className={styles.footer}>
            <div>
                <NavLink to={`${url}/details`}>Details</NavLink>
            </div>
            <div>
                <NavLink to={`${url}/trailers`}>Trailers</NavLink>
            </div>
            <div>
                <NavLink to={`${url}/cast-and-crew`}>Cast & Crew</NavLink>
            </div>
            <div>
                <NavLink to={`${url}/images`}>Images</NavLink>
            </div>
        </div>
    );
}
