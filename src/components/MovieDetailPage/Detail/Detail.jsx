import React, { useEffect } from "react";
import styles from "./Detail.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Button, Typography } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import {
	reformatDate,
	numberWithCommas,
	convertToHourAndMinutes,
	getVotes,
	hasVoted,
	getPollForMovie,
} from "../../../util";
import { votePoll } from "../../../redux/actions";

export default function MovieDetail() {
	const movie = useSelector((state) => state.movie);
	const polls = useSelector((state) => state.polls);
	const authUser = useSelector((state) => state.authenticated);

	if (!movie) {
		return null;
	}

	const {
		id,
		title,
		tagline,
		runtime,
		vote_average,
		release_date,
		budget,
		overview,
	} = movie;

	const director = movie.credits.crew.filter(
		(crew) => crew.job === "Director"
	);

	const formattedDate = reformatDate(release_date);

	const genres = movie
		? movie.genres.map((genre) => genre.name).join(", ")
		: null;

	const voteHandler = (dispatch, isUpvote) => {
		dispatch(
			votePoll(getPollForMovie(polls, id), isUpvote, authUser._id, id)
		);
	};

	const VoteContainer = () => {
		const dispatch = useDispatch();

		return (
			<div className={styles.voteContainer}>
				<Button
					variant="contained"
					color="default"
					onClick={() => voteHandler(dispatch, true)}
					className={
						hasVoted(
							getPollForMovie(polls, id).upvoters,
							authUser._id
						)
							? styles.voted
							: null
					}
				>
					<ArrowUpwardIcon />
				</Button>
				<Typography
					variant="h5"
					style={{ marginRight: "1rem", marginLeft: "1rem" }}
				>
					{getVotes(polls, id)}
				</Typography>
				<Button
					variant="contained"
					color="default"
					onClick={() => voteHandler(dispatch, false)}
					className={
						hasVoted(
							getPollForMovie(polls, id).downvoters,
							authUser._id
						)
							? styles.voted
							: null
					}
				>
					<ArrowDownwardIcon />
				</Button>
			</div>
		);
	};

	const moviePage = (
		<div className={styles.container}>
			<h1>{title}</h1>
			{tagline && <h5 className={styles.tagline}>{`"${tagline}"`}</h5>}
			<VoteContainer />
			<div className={styles.rating}>
				<i className="fas fa-stopwatch"></i>
				{convertToHourAndMinutes(runtime)}
				<span className={styles.star}>
					<i className="fas fa-star"></i>
					{vote_average}
				</span>
			</div>
			<div className={styles.genres}>
				<h4>{genres}</h4>
			</div>
			<div className={styles.extraDetails}>
				<div>
					<h5 className={styles.textMuted}>Release Date</h5>
					{formattedDate}
				</div>
				<div>
					<h5 className={styles.textMuted}>Director</h5>
					{director[0] ? director[0].name : "Unavailable"}
				</div>
				<div>
					<h5 className={styles.textMuted}>Budget</h5>
					{budget ? numberWithCommas(budget) : "Unavailable"}
				</div>
			</div>
			<div className={styles.overview}>
				<h4 className={styles.textMuted}>Overview</h4>
				{overview}
			</div>
		</div>
	);

	return moviePage;
}
