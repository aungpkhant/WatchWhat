import React, { useEffect, useState } from "react";
import styles from "./Trending.module.css";
import { useDispatch, useSelector } from "react-redux";
import { MovieCard } from "../index";
import { fetchTrending } from "../../redux/actions";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Trending() {
    const dispatch = useDispatch();
    const trending = useSelector((state) => state.trending);
    const pageNo = useSelector((state) => state.trendingPage);

    useEffect(() => {
        fetchMoreMovies();
    }, []);

    const fetchMoreMovies = () => {
        dispatch(fetchTrending(pageNo));
    };

    const renderMovieCards = trending.map((movie) => (
        <MovieCard key={movie.id} {...movie} />
    ));

    return (
        <InfiniteScroll
            dataLength={trending.length}
            next={fetchMoreMovies}
            hasMore={true}
            loader={<h4>Loading...</h4>}
        >
            <div className={styles.container}>{renderMovieCards}</div>
        </InfiniteScroll>
    );
}
