import React, { useState } from "react";
import { Alert } from "reactstrap";
import "./ErrorAlert.css";

const ErrorAlert = (props) => {
    const [visible, setVisible] = useState(true);

    const onDismiss = () => setVisible(false);

    return (
        <Alert
            className="mt-3"
            color="danger"
            isOpen={visible}
            toggle={onDismiss}
        >
            {props.message ? props.message : "Oops! Something went wrong :("}
        </Alert>
    );
};

export default ErrorAlert;
