import React, { useEffect, useState } from "react";
import styles from "./Upcoming.module.css";
import { useDispatch, useSelector } from "react-redux";
import { MovieCard } from "../index";
import { fetchUpcoming } from "../../redux/actions";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Trending() {
    const dispatch = useDispatch();
    const upcoming = useSelector((state) => state.upcoming);
    const pageNo = useSelector((state) => state.upcomingPage);

    useEffect(() => {
        fetchMoreMovies();
    }, []);

    const fetchMoreMovies = () => {
        dispatch(fetchUpcoming(pageNo));
    };

    const renderMovieCards = upcoming.map((movie) => (
        <MovieCard key={movie.id} {...movie} />
    ));

    return (
        <InfiniteScroll
            dataLength={upcoming.length}
            next={fetchMoreMovies}
            hasMore={true}
            loader={<h4>Loading...</h4>}
        >
            <div className={styles.container}>{renderMovieCards}</div>
        </InfiniteScroll>
    );
}
