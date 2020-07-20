import React, { useState } from "react";
import styles from "./MovieCard.module.css";
import cx from "classnames";
import { api_img_url_500 } from "../../api/constants";
import { handleMovieClick } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

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

export default function MovieCard(props) {
    const dispatch = useDispatch();
    const [isShown, setIsShown] = useState(false);

    return (
        <div
            className={styles.container}
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
            onClick={() => dispatch(handleMovieClick(props.id))}
        >
            <img src={api_img_url_500 + props.poster_path} alt="" />

            <div
                className={cx(
                    styles.details,
                    isShown ? styles.show : styles.hide
                )}
            >
                <div className={styles.flexRow}>
                    <div>{props.title}</div>
                    <div>{props.vote_average}</div>
                </div>
                <div>{props.release_date}</div>
                <div className={styles.flexRow}>
                    <div>Scary</div>
                    <div>Scary</div>
                </div>
            </div>
        </div>
    );
}
