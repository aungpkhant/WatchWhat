import { months } from "./constants";

export const reformatDate = (date_string) => {
	let [year, month, day] = date_string.split("-");
	month = month.toString();
	return `${day} ${months[month]} ${year}`;
};

export const numberWithCommas = (x) => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const convertToHourAndMinutes = (timeInMin) => {
	const hours = Math.floor(timeInMin / 60);
	const minutes = timeInMin % 60;
	return `${hours}h ${minutes}m`;
};

export const getVotes = (polls, movieId) => {
	const poll = polls.find((poll) => poll.movieId == movieId);
	if (poll) {
		return poll.upvoters.length - poll.downvoters.length;
	}
	return 0;
};

export const hasVoted = (votes = [], authUserId) => {
	if (!authUserId) return false;
	return votes.includes(authUserId);
};

export const getPollForMovie = (polls, movieId) => {
	if (polls.length < 1) return [];
	const poll = polls.find((poll) => poll.movieId == movieId);
	return poll || [];
};
