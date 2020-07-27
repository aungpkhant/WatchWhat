import React from "react";
import styles from "./MoviePlayer.module.css";
import { YOUTUBE_EMBED_LINK } from "../../../../api/constants";

export default function MoviePlayer({ trailerId }) {
    const videoSrc = `${YOUTUBE_EMBED_LINK}${trailerId}`;
    return (
        trailerId && (
            <iframe
                className={styles.movieFrame}
                title=""
                src={videoSrc}
                frameborder="0"
                allowFullScreen
            ></iframe>
        )
    );
}
