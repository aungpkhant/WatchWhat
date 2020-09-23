import React, { useEffect } from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import {
	Drawer,
	AppBar,
	CssBaseline,
	Toolbar,
	Typography,
	Divider,
	Button,
	List,
	ListItem,
	IconButton,
} from "@material-ui/core";
import { DrawerItem, TypeAhead } from "../index";
import genres from "./Genres";
import { useSelector, useDispatch } from "react-redux";
import { setDrawerState, logOut, signIn } from "../../redux/actions";

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
	divider: {
		background: "rgb(148, 148, 148)",
	},
}));

const AuthButton = ({ authenticated, dispatch }) => {
	const handleClick = authenticated
		? () => dispatch(logOut())
		: () => dispatch(signIn());

	return (
		<Button
			variant="contained"
			color="primary"
			onClick={() => handleClick()}
		>
			{authenticated ? "Logout" : "Login w/ FB"}
		</Button>
	);
};

export default function Header() {
	const isMobileorTablet = useMediaQuery({ query: "(max-width: 1024px)" });
	const classes = useStyles();
	const drawerOpen = useSelector((state) => state.drawerOpen);
	const authenticated = useSelector((state) => state.authenticated);
	const dispatch = useDispatch();

	const drawerItems = genres.map((genre) => (
		<DrawerItem key={genre.name} text={genre.name} />
	));

	const shortcutHandler = (e) => {
		console.log(e);
		// escape key
		if (e.keyCode === 27 && drawerOpen) {
			dispatch(setDrawerState(false));
		}
	};

	useEffect(() => {
		document.addEventListener("keydown", (e) => shortcutHandler(e));

		return () => {
			document.removeEventListener("keydown", (e) => shortcutHandler(e));
		};
	}, [drawerOpen]);

	const primaryLinks = (
		<Toolbar className={styles.navSubContainer}>
			<TypeAhead />
		</Toolbar>
	);

	const primaryDrawerLinks = (
		<div>
			<ListItem>
				<Toolbar>
					<TypeAhead />
				</Toolbar>
			</ListItem>
		</div>
	);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={() => dispatch(setDrawerState(!drawerOpen))}
						edge="start"
						className={clsx(
							classes.menuButton,
							drawerOpen && classes.hide
						)}
						className={styles.menuBtn}
					>
						<MenuIcon style={{ marginRight: "1rem" }} />
					</IconButton>
					<Typography variant="h4" noWrap>
						<NavLink to="/" className={styles.navBrand}>
							WatchWhat
						</NavLink>
					</Typography>
				</Toolbar>
				<Toolbar>
					{!isMobileorTablet && primaryLinks}
					<AuthButton
						authenticated={authenticated}
						dispatch={dispatch}
					/>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				classes={{
					paper: classes.drawerPaper,
				}}
				open={drawerOpen}
			>
				<Toolbar />
				<div className={classes.drawerContainer}>
					{isMobileorTablet && primaryDrawerLinks}
					<ListItem>
						<Typography
							variant="h6"
							noWrap
							style={{ marginRight: "1rem" }}
						>
							<NavLink to="/poll" className={styles.navBrand}>
								POLL
							</NavLink>
						</Typography>
					</ListItem>
					<ListItem>
						<Typography variant="h6" noWrap>
							<NavLink to="/trending" className={styles.navBrand}>
								TRENDING
							</NavLink>
						</Typography>
					</ListItem>
					<ListItem>
						<Typography variant="h6" noWrap>
							<NavLink to="/upcoming" className={styles.navBrand}>
								UPCOMING
							</NavLink>
						</Typography>
					</ListItem>
					<Divider classes={{ root: classes.divider }} />
					<List>{drawerItems}</List>
					<Divider classes={{ root: classes.divider }} />
					<ListItem>
						<Typography variant="h6" noWrap>
							<NavLink
								to="/privacy-policy"
								className={styles.navBrand}
							>
								PRIVACY POLICY
							</NavLink>
						</Typography>
					</ListItem>
				</div>
			</Drawer>
		</div>
	);
}
