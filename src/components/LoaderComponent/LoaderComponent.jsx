import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import React from "react";
import styles from "./LoaderComponent.module.css";

export default function LoaderComponent() {
    return (
        <div className={styles.loaderContainer}>
            <Loader
                type="ThreeDots"
                color="#9e46ffe0"
                height={100}
                width={100}
                timeout={0} //3 secs
            />
        </div>
    );
}
