import React, { useState } from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import styles from "./NewHeader.module.css";
import { NavLink } from "react-router-dom";
import {
    Drawer,
    AppBar,
    CssBaseline,
    Toolbar,
    Typography,
    Divider,
    List,
    InputBase,
    IconButton,
    Menu,
} from "@material-ui/core";
import { DrawerItem } from "../index";
import genres from "./Genres";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: "rgb(20, 20, 20, 0.9)",
        justifyContent: "space-between",
        flexDirection: "row",
        color: "#bb86fc",
        borderBottom: "solid 1px rgb(148, 148, 148)",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: "#202020",
        borderRight: "solid 1px rgb(148, 148, 148)",
        color: "#bb86fc",
    },
    drawerContainer: {
        overflow: "auto",
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(1),
            width: "auto",
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputRoot: {
        color: "inherit",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));

export default function NewHeader() {
    const classes = useStyles();
    const [open, setOpen] = useState(true);

    const drawerItems = genres.map((genre) => <DrawerItem text={genre.name} />);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setOpen(!open)}
                        edge="start"
                        className={clsx(
                            classes.menuButton,
                            open && classes.hide
                        )}
                    >
                        <MenuIcon className={styles.menuIcon} />
                    </IconButton>
                    <Typography variant="h4" noWrap>
                        <NavLink to="/" className={styles.navBrand}>
                            WatchWhat
                        </NavLink>
                    </Typography>
                </Toolbar>
                <Toolbar className={styles.navSubContainer}>
                    <Typography variant="h6" noWrap>
                        <NavLink to="/trending" className={styles.navBrand}>
                            Trending
                        </NavLink>
                        <NavLink to="/upcoming" className={styles.navBrand}>
                            Upcoming
                        </NavLink>
                    </Typography>
                    <Toolbar>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                            />
                        </div>
                    </Toolbar>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                open={open}
            >
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <List>{drawerItems}</List>
                </div>
            </Drawer>
        </div>
    );
}
