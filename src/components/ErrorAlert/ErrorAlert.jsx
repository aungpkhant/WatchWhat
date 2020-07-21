import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert } from "reactstrap";
import { setIsErrorToFalse } from "../../redux/actions";
import "./ErrorAlert.css";

const ErrorAlert = (props) => {
    const isError = useSelector((state) => state.isError);
    const dispatch = useDispatch();

    useEffect(() => {
        const waitAndFade = async () => {
            setTimeout(() => {
                dispatch(setIsErrorToFalse());
            }, 2000);
        };

        if (isError == true) {
            waitAndFade();
        }
    }, [isError]);

    const onDismiss = () => {};

    return (
        <Alert color="danger" isOpen={isError}>
            {props.message ? props.message : "Oops! Something went wrong :( "}
        </Alert>
    );
};

export default ErrorAlert;
