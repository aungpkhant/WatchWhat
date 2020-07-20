import React, { useEffect } from "react";
import styles from "./MovieDetail.module.css";
import { useSelector } from "react-redux";

export default function MovieDetail(props) {
    const movie = useSelector((state) => state.movie);

    const moviePage = (
        <div className={styles.container}>
            <h1>{movie.title}</h1>
            <h5 className={styles.tagline}>{`"${movie.tagline}"`}</h5>
            <div className={styles.genres}></div>
            <div className={styles.rating}>
                <i className="fas fa-stopwatch"></i>
                {movie.runtime}
                <span className={styles.star}>
                    <i className="fas fa-star"></i>
                    {movie.vote_average}
                </span>
            </div>
            <div className={styles.overview}>
                <h4>Overview</h4>
                {movie.overview}
            </div>
        </div>
    );

    return moviePage;
}
