import React, { useEffect } from "react";
import styles from "./MovieCastCrew.module.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovie } from "../../../redux/actions";
import { api_img_url_500 } from "../../../api/constants";
import { SRLWrapper } from "simple-react-lightbox";

export default function MovieImages(props) {
    const movie = useSelector((state) => state.movie);
    const dispatch = useDispatch();
    const movie_id = props.match.params.id;

    useEffect(() => {
        if (!movie || movie.movie_id !== movie_id) {
            dispatch(fetchMovie(movie_id));
        }
    }, []);

    const cast = movie ? movie.credits.cast : null;
    const crew = movie ? movie.credits.crew : null;

    const castComponent = cast
        ? cast.map((c, index) => (
              <div className={styles.singleCastContainer} key={index}>
                  <img
                      src={`${api_img_url_500}${c.profile_path}`}
                      className={styles.image}
                      alt={`${c.name} as ${c.character}`}
                  />
                  <h6>{c.name}</h6>
                  <h6 className={styles.textMuted}>{c.character}</h6>
              </div>
          ))
        : null;

    return movie ? (
        <SRLWrapper>
            <div className={styles.container}>
                <div className={styles.castContainer}>{castComponent}</div>
            </div>
        </SRLWrapper>
    ) : null;
}
