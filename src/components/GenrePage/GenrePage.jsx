import React, { useEffect, useState } from "react";
import styles from "./GenrePage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { MovieCard } from "../index";
import { fetchGenre } from "../../redux/actions";
import InfiniteScroll from "react-infinite-scroll-component";
import genres from "../Header/Genres";

export default function GenrePage(props) {
    let selectedGenre = null;
    const dispatch = useDispatch();
    const genreMovies = useSelector((state) => state.genreMovies);
    const pageNo = useSelector((state) => state.genrePage);
    let genre = useSelector((state) => state.genre);

    useEffect(() => {
        if (genre === null) {
            genre = props.match.params.genre;
        }
        fetchMoreMovies();
    }, [genre]);

    const fetchMoreMovies = () => {
        if (genre === null) {
            genre = props.match.params.genre;
        }
        selectedGenre = genres.filter((g) => g.name == genre.toLowerCase());
        dispatch(fetchGenre(selectedGenre[0].id, pageNo));
    };

    const renderMovieCards = genreMovies.map((movie) => (
        <MovieCard key={movie.id} {...movie} />
    ));

    return (
        <InfiniteScroll
            dataLength={genreMovies.length}
            next={fetchMoreMovies}
            hasMore={true}
            loader={<h4>Loading...</h4>}
        >
            <div className={styles.container}>{renderMovieCards}</div>
        </InfiniteScroll>
    );
}
