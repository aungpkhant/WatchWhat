import React, { useEffect } from "react";
import styles from "./Detail.module.css";
import { useSelector } from "react-redux";
import { reformatDate } from "../../../util";

const convertToHourAndMinutes = (timeInMin) => {
    const hours = Math.floor(timeInMin / 60);
    const minutes = timeInMin % 60;
    return `${hours}h ${minutes}m`;
};

export default function MovieDetail() {
    const movie = useSelector((state) => state.movie);

    if (!movie) {
        return null;
    }

    const {
        title,
        tagline,
        runtime,
        vote_average,
        release_date,
        budget,
        overview,
    } = movie;

    const director = movie.credits.crew.filter(
        (crew) => crew.job === "Director"
    );

    const formattedDate = reformatDate(release_date);

    const genres = movie
        ? movie.genres.map((genre) => genre.name).join(", ")
        : null;

    const moviePage = (
        <div className={styles.container}>
            <h1>{title}</h1>
            {tagline && <h5 className={styles.tagline}>{`"${tagline}"`}</h5>}
            <div className={styles.rating}>
                <i className="fas fa-stopwatch"></i>
                {convertToHourAndMinutes(runtime)}
                <span className={styles.star}>
                    <i className="fas fa-star"></i>
                    {vote_average}
                </span>
            </div>
            <div className={styles.genres}>
                <h4>{genres}</h4>
            </div>
            <div className={styles.extraDetails}>
                <div>
                    <h5 className={styles.textMuted}>Release Date</h5>
                    {formattedDate}
                </div>
                <div>
                    <h5 className={styles.textMuted}>Director</h5>
                    {director[0] ? director[0].name : "Unavailable"}
                </div>
                <div>
                    <h5 className={styles.textMuted}>Budget</h5>
                    {budget ? budget : "Unavailable"}
                </div>
            </div>
            <div className={styles.overview}>
                <h4 className={styles.textMuted}>Overview</h4>
                {overview}
            </div>
        </div>
    );

    return moviePage;
}
