import React, { useEffect, useState } from "react";
import styles from "./Trailers.module.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovie, fetchTrailers } from "../../../redux/actions";

export default function MovieTrailers(props) {
    const movie = useSelector((state) => state.movie);
    const trailers = useSelector((state) => state.trailers);
    const dispatch = useDispatch();
    const movie_id = props.match.params.id;

    useEffect(() => {
        if (!movie || movie.movie_id !== movie_id) {
            dispatch(fetchMovie(movie_id));
        }
    }, []);

    useEffect(() => {
        if (movie) {
            let trailer_ids = [];
            for (let vid of movie.videos.results) {
                trailer_ids.push(vid.key);
            }
            trailer_ids = trailer_ids.join();
            dispatch(fetchTrailers(trailer_ids));
        }
    }, [movie]);

    const trailersComponent = trailers
        ? trailers.map((trailer, index) => (
              <div
                  onClick={() => props.setTrailerId(trailer.id)}
                  key={trailer.id}
              >
                  <img
                      src={trailer.snippet.thumbnails.medium.url}
                      className={styles.trailer}
                  />
              </div>
          ))
        : null;

    const trailerPage =
        movie && trailers ? (
            <div className={styles.trailersContainer}>{trailersComponent}</div>
        ) : null;

    return movie ? trailerPage : null;
}
