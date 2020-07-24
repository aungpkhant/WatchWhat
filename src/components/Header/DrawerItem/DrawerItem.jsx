import React from "react";
import { ListItem, ListItemText, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import styles from "./DrawerItem.module.css";
import { handleGenreClick } from "../../../redux/actions";
import { useDispatch } from "react-redux";

export default function DrawerItem({ text }) {
    const dispatch = useDispatch();

    return (
        <ListItem
            button
            key={text}
            onClick={() => dispatch(handleGenreClick(text))}
        >
            <ListItemText
                primary={
                    <Typography variant="h6">{text.toUpperCase()}</Typography>
                }
            />
        </ListItem>
    );
}
