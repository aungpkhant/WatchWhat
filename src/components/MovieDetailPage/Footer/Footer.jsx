import React from "react";
import styles from "./MoviePageFooter.module.css";
import { useRouteMatch, NavLink } from "react-router-dom";

export default function MoviePageFooter() {
    let { url } = useRouteMatch();

    return (
        <div className={styles.footer}>
            <div>
                <NavLink
                    to={`${url}/details`}
                    activeClassName={styles.navActive}
                >
                    Details
                </NavLink>
            </div>
            <div>
                <NavLink
                    to={`${url}/trailers`}
                    activeClassName={styles.navActive}
                >
                    Trailers
                </NavLink>
            </div>
            <div>
                <NavLink
                    to={`${url}/cast-and-crew`}
                    activeClassName={styles.navActive}
                >
                    Cast & Crew
                </NavLink>
            </div>
            <div>
                <NavLink
                    to={`${url}/images`}
                    activeClassName={styles.navActive}
                >
                    Images
                </NavLink>
            </div>
        </div>
    );
}
