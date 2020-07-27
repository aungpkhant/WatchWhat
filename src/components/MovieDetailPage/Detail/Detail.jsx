import React, { useEffect } from "react";
import styles from "./Detail.module.css";
import { useSelector } from "react-redux";

const convertToHourAndMinutes = (timeInMin) => {
    const hours = Math.floor(timeInMin / 60);
    const minutes = timeInMin % 60;
    return `${hours}h ${minutes}m`;
};

export default function MovieDetail() {
    const movie = useSelector((state) => state.movie);

    const genres = movie
        ? movie.genres.map((genre) => genre.name).join(", ")
        : null;

    const moviePage = (
        <div className={styles.container}>
            <h1>{movie.title}</h1>
            {movie.tagline && (
                <h5 className={styles.tagline}>{`"${movie.tagline}"`}</h5>
            )}
            <div className={styles.rating}>
                <i className="fas fa-stopwatch"></i>
                {convertToHourAndMinutes(movie.runtime)}
                <span className={styles.star}>
                    <i className="fas fa-star"></i>
                    {movie.vote_average}
                </span>
            </div>
            <div className={styles.genres}>
                <h4>{genres}</h4>
            </div>
            <div className={styles.overview}>
                <h4 className={styles.textMuted}>Overview</h4>
                {movie.overview}
            </div>
        </div>
    );

    return moviePage;
}
