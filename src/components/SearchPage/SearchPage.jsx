import React, { useEffect, useState } from "react";
import styles from "./SearchPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { MovieCard } from "../index";

export default function SearchPage() {
    const dispatch = useDispatch();
    const searchResults = useSelector((state) => state.searchResults);

    const renderMovieCards = searchResults
        ? searchResults.map((movie) => <MovieCard key={movie.id} {...movie} />)
        : null;

    return <div className={styles.container}>{renderMovieCards}</div>;
}
