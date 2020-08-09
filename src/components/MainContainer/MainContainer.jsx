import React from "react";
import {
    Header,
    ErrorAlert,
    Trending,
    Upcoming,
    SearchPage,
    GenrePage,
    MovieDetailPage,
    LoaderComponent,
} from "../index";
import { useSelector } from "react-redux";
import styles from "./MainContainer.module.css";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import history from "../../util/history";

export default function MainContainer() {
    const isError = useSelector((state) => state.isError);
    const isLoading = useSelector((state) => state.isLoading);

    return (
        <div className={styles.container}>
            {isError && <ErrorAlert />}
            {isLoading && <LoaderComponent />}
            <Router history={history}>
                <Header />

                <Switch>
                    <Redirect exact from="/" to="/trending" />
                    <Route exact path="/trending" component={Trending} />
                    <Route exact path="/upcoming" component={Upcoming} />
                    <Route path="/search" component={SearchPage} />
                    <Route path="/movies/:id" component={MovieDetailPage} />
                    <Route path="/genre/:genre" component={GenrePage} />
                </Switch>
            </Router>
        </div>
    );
}
