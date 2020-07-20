import React from "react";
import { api_img_url_OG } from "../../../../api/constants";
import styles from "./VerticalWrapper.module.css";

export default function VerticalWrapper({ children, backdrop }) {
    return (
        <div className={styles.mainContainer}>
            <div
                className={styles.topContainer}
                style={{
                    backgroundImage: `url(${api_img_url_OG}${backdrop})`,
                    backgroundPosition: `center center`,
                    backgroundRepeat: `no-repeat`,
                    backgroundSize: "cover",
                }}
            >
                {children && children[1] ? children[1] : null}
            </div>
            <div className={styles.bottomContainer}>
                {children.length > 1 ? children[0] : children}
            </div>
        </div>
    );
}
