import React, { useEffect, useState } from "react";
import styles from "./MovieListPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { MovieCard } from "../index";
import InfiniteScroll from "react-infinite-scroll-component";

export default function MovieListPage({
    actionCreator,
    categorySelector,
    categoryPageSelector,
}) {
    const dispatch = useDispatch();

    // category: Trending, Upcoming, Genre, Search
    const category = categorySelector;
    const pageNo = categoryPageSelector;

    useEffect(() => {
        fetchMoreMovies();
    }, []);

    const fetchMoreMovies = () => {
        dispatch(actionCreator(pageNo));
    };

    const renderMovieCards = category.map((movie) => (
        <MovieCard key={movie.id} {...movie} />
    ));

    return (
        <InfiniteScroll
            dataLength={category.length}
            next={fetchMoreMovies}
            hasMore={true}
            loader={<h4>Loading...</h4>}
        >
            <div className={styles.container}>{renderMovieCards}</div>
        </InfiniteScroll>
    );
}
