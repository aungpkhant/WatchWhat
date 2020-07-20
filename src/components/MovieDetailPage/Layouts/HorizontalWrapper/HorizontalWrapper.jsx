import React from "react";
import { useSelector } from "react-redux";
import { api_img_url_OG } from "../../../../api/constants";
import styles from "./HorizontalWrapper.module.css";

export default function HorizontalWrapper({ children, backdrop }) {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.leftContainer}>{children}</div>
            <div
                className={styles.rightContainer}
                style={{
                    backgroundImage: `url(${api_img_url_OG}${backdrop})`,
                    backgroundPosition: `center center`,
                    backgroundRepeat: `no-repeat`,
                    backgroundSize: "cover",
                }}
            ></div>
        </div>
    );
}
