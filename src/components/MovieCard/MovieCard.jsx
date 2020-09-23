import React, { useState } from "react";
import styles from "./MovieCard.module.css";
import cx from "classnames";
import { api_img_url_500 } from "../../api/constants";
import { handleMovieClick } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function MovieCard({
  id,
  poster_path,
  vote_average = "unrateds",
  details,
}) {
  const dispatch = useDispatch();

  const poster_img = poster_path
    ? api_img_url_500 + poster_path
    : `${process.env.PUBLIC_URL}/images/default-poster.jpg`;

  return (
    <div
      className={styles.container}
      onClick={() => dispatch(handleMovieClick(id))}
    >
      <div className={styles.details}>
        <i className="fas fa-star"></i>

        {vote_average}
      </div>
      <img src={poster_img} alt="" />
    </div>
  );
}
