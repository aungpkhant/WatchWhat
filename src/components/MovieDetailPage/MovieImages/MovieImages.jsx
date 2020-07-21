import React, { useEffect } from "react";
import styles from "./MovieImages.module.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovie } from "../../../redux/actions";
import { api_img_url_OG } from "../../../api/constants";
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

    const images = movie.images.backdrops;

    console.log("images", images);

    const imagesComponent = images
        ? images.map((img, index) => (
              <div key={index}>
                  <img
                      src={`${api_img_url_OG}${img.file_path}`}
                      className={styles.image}
                  />
              </div>
          ))
        : null;

    return movie ? (
        <SRLWrapper>
            <div className={styles.imagesContainer}>{imagesComponent}</div>
        </SRLWrapper>
    ) : null;
}
