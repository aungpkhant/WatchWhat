import React, { useEffect, useState } from "react";
import styles from "./Trending.module.css";
import { useDispatch, useSelector } from "react-redux";
import { MovieCard } from "../index";
import { fetchTrending } from "../../redux/actions";
import InfiniteScroll from "react-infinite-scroll-component";

const movie = {
    popularity: 280.415,
    vote_count: 1850,
    video: false,
    poster_path: "/s1cVTQEZYn4nSjZLnFbzLP0j8y2.jpg",
    id: 8619,
    adult: false,
    backdrop_path: "/m11Mej9vbQqcXWgYrgPboCJ9NUh.jpg",
    original_language: "en",
    original_title: "Master and Commander: The Far Side of the World",
    genre_ids: [12, 18, 10752],
    title: "Master and Commander: The Far Side of the World",
    vote_average: 7,
    overview:
        "After an abrupt and violent encounter with a French warship inflicts severe damage upon his ship, a captain of the British Royal Navy begins a chase over two oceans to capture or destroy the enemy, though he must weigh his commitment to duty and ferocious pursuit of glory against the safety of his devoted crew, including the ship's thoughtful surgeon, his best friend.",
    release_date: "2003-11-14",
};

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
