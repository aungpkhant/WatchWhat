import React, { useEffect, useState } from "react";
import styles from "./CastCrew.module.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovie } from "../../../redux/actions";
import { api_img_url_500 } from "../../../api/constants";
import { SRLWrapper } from "simple-react-lightbox";

const placeHolder = (
    <svg width="100" height="180" viewBox="100">
        <rect width="100" height="180" rx="10" ry="10" fill="#CCC" />
    </svg>
);

const ImageWithLoading = ({ profile_path, name, character }) => {
    const [loaded, setLoaded] = useState(false);

    const loadedItem = (
        <>
            <img
                src={
                    profile_path
                        ? `${api_img_url_500}${profile_path}`
                        : `${process.env.PUBLIC_URL}/images/default-crew.jpg`
                }
                className={styles.image}
                alt={`${name} as ${character}`}
                onLoad={() => setLoaded(true)}
                style={loaded ? {} : { visibility: "hidden" }}
            />
        </>
    );

    return (
        <div className={styles.singleCastContainer}>
            {loaded || placeHolder}
            {loadedItem}
            <h6>{name}</h6>
            <h6 className={styles.textMuted}>{character}</h6>
        </div>
    );
};

export default function CastCrew(props) {
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
        ? cast.map((c, index) => <ImageWithLoading {...c} key={index} />)
        : null;

    return movie ? (
        <SRLWrapper>
            <div className={styles.container}>
                <div className={styles.castContainer}>{castComponent}</div>
            </div>
        </SRLWrapper>
    ) : null;
}
