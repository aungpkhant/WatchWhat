import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Poll.module.css";
import { api_img_url_500 } from "../../api/constants";
import { convertToHourAndMinutes, hasVoted, getPollForMovie } from "../../util";
import { Button, Typography } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { fetchPolls, votePoll, handleMovieClick } from "../../redux/actions";
import Countdown from "react-countdown";

const PollItem = ({
	id,
	polls,
	vote_count,
	poster_path,
	title,
	vote_average = "unrated",
	runtime,
	overview,
	upvotes = [],
	downvotes = [],
	dispatch,
	authUser = [],
}) => {
	const voteHandler = (isUpvote) => {
		dispatch(
			votePoll(getPollForMovie(polls, id), isUpvote, authUser._id, id)
		);
	};

	const poster_img = poster_path
		? api_img_url_500 + poster_path
		: `${process.env.PUBLIC_URL}/images/default-poster.jpg`;

	return (
		<div className={styles.pollItemContainer}>
			<img src={poster_img} alt="" />
			<div>
				<h3
					onClick={() => dispatch(handleMovieClick(id))}
					className={styles.movieLink}
				>
					{title}
				</h3>
				<div className={styles.rating}>
					<i className="fas fa-stopwatch"></i>
					{convertToHourAndMinutes(runtime)}
					<span className={styles.star}>
						<i className="fas fa-star"></i>
						{vote_average}
					</span>
				</div>
				<p className={styles.overview}>{overview}</p>
			</div>
			<VoteComponent
				vote_count={vote_count}
				voteHandler={voteHandler}
				totalVoteCount={upvotes.length - downvotes.length}
				hasUpvoted={hasVoted(upvotes, authUser._id)}
				hasDownvoted={hasVoted(downvotes, authUser._id)}
			/>
		</div>
	);
};

const VoteComponent = ({
	totalVoteCount = 0,
	voteHandler,
	hasUpvoted,
	hasDownvoted,
}) => {
	return (
		<div className={styles.voteContainer}>
			<Button
				variant="contained"
				color="default"
				onClick={() => voteHandler(true)}
				className={hasUpvoted ? styles.voted : null}
			>
				<ArrowUpwardIcon />
			</Button>
			<Typography
				variant="h5"
				style={{
					marginTop: "1rem",
					marginBottom: "1rem",
				}}
			>
				{totalVoteCount}
			</Typography>
			<Button
				variant="contained"
				color="default"
				onClick={() => voteHandler(false)}
				className={hasDownvoted ? styles.voted : null}
			>
				<ArrowDownwardIcon />
			</Button>
		</div>
	);
};

const Timer = ({
	total,
	days,
	hours,
	minutes,
	seconds,
	milliseconds,
	completed,
}) => {
	return (
		<>
			{days * 24 + hours}h {minutes}m {seconds}s
		</>
	);
};

const Poll = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchPolls());
	}, []);
	const polls = useSelector((state) => state.polls);
	const authUser = useSelector((state) => state.authenticated);
	const poll_expire = useSelector((state) => state.poll_expire);

	const pollItems = polls.map((poll) => (
		<PollItem
			polls={polls}
			key={poll.movieId}
			{...poll.details}
			upvotes={poll.upvoters}
			downvotes={poll.downvoters}
			dispatch={dispatch}
			authUser={authUser}
		/>
	));

	return (
		<div className={styles.container}>
			<h2 style={{ textAlign: "center" }}>
				Poll ends in <Countdown date={poll_expire} renderer={Timer} />
			</h2>
			{pollItems}
		</div>
	);
};

export default Poll;
