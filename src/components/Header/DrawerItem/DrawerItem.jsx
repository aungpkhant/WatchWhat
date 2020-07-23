import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
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
            <ListItemText primary={text} />
        </ListItem>
    );
}
