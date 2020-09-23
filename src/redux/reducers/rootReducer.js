import {
	FETCH_TRENDING_INITIATED,
	FETCH_TRENDING_SUCCESS,
	FETCH_TRENDING_FAIL,
	FETCH_UPCOMING_INITIATED,
	FETCH_UPCOMING_SUCCESS,
	FETCH_UPCOMING_FAIL,
	FETCH_MOVIE_INITIATED,
	FETCH_MOVIE_SUCCESS,
	FETCH_MOVIE_FAIL,
	FETCH_TRAILERS_INITIATED,
	FETCH_TRAILERS_SUCCESS,
	FETCH_TRAILERS_FAIL,
	SET_SEARCH_RESULTS,
	SET_IS_ERROR_FALSE,
	FETCH_GENRE_MOVIES_INITIATED,
	FETCH_GENRE_MOVIES_SUCCESS,
	FETCH_GENRE_MOVIES_FAIL,
	GENRE_CLICKED,
	SET_DRAWER_OPEN,
	SET_AUTHENTICATED,
	FETCH_POLLS_INITIATED,
	FETCH_POLLS_SUCCESS,
	FETCH_POLLS_FAIL,
	FETCH_POLLS_EXPIRY_INITIATED,
	FETCH_POLLS_EXPIRY_SUCCESS,
	FETCH_POLLS_EXPIRY_FAIL,
	VOTE_POLL_INITIATED,
	VOTE_POLL_SUCCESS,
	VOTE_POLL_FAIL,
} from "../types";

const initialState = {
	trending: [],
	trendingPage: 1,
	upcoming: [],
	upcomingPage: 1,
	isLoading: false,
	isError: false,
	drawerOpen: true,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case FETCH_TRENDING_INITIATED:
		case FETCH_UPCOMING_INITIATED:
		case FETCH_MOVIE_INITIATED:
		case FETCH_TRAILERS_INITIATED:
		case FETCH_GENRE_MOVIES_INITIATED:
		case FETCH_POLLS_INITIATED:
		case VOTE_POLL_INITIATED:
		case FETCH_POLLS_EXPIRY_INITIATED:
			return {
				...state,
				isLoading: true,
			};
		case FETCH_TRENDING_SUCCESS:
			return {
				...state,
				trending: [...state.trending, ...action.payload],
				trendingPage: state.trendingPage + 1,
				isLoading: false,
			};
		case FETCH_TRENDING_FAIL:
		case FETCH_UPCOMING_FAIL:
		case FETCH_MOVIE_FAIL:
		case FETCH_TRAILERS_FAIL:
		case FETCH_GENRE_MOVIES_FAIL:
		case FETCH_POLLS_FAIL:
		case VOTE_POLL_FAIL:
		case FETCH_POLLS_EXPIRY_FAIL:
			return {
				...state,
				isLoading: false,
				isError: true,
			};
		case FETCH_MOVIE_SUCCESS:
			return {
				...state,
				movie: action.payload,
				isLoading: false,
			};
		case FETCH_TRAILERS_SUCCESS:
			return {
				...state,
				trailers: action.payload,
				isLoading: false,
			};
		case FETCH_UPCOMING_SUCCESS:
			return {
				...state,
				upcoming: [...state.upcoming, ...action.payload],
				upcomingPage: state.upcomingPage + 1,
				isLoading: false,
			};
		case FETCH_GENRE_MOVIES_SUCCESS:
			return {
				...state,
				genreMovies: [...state.genreMovies, ...action.payload],
				genrePage: state.genrePage + 1,
				isLoading: false,
			};
		case FETCH_POLLS_SUCCESS:
			return {
				...state,
				polls: [...action.payload],
				isLoading: false,
			};
		case FETCH_POLLS_EXPIRY_SUCCESS:
			return {
				...state,
				poll_expire: action.payload,
				isLoading: false,
			};
		case VOTE_POLL_SUCCESS:
			console.log(action.payload);
			return {
				...state,
				polls: action.payload,
				isLoading: false,
			};
		case SET_SEARCH_RESULTS:
			return {
				...state,
				searchResults: [...action.payload],
			};
		case SET_IS_ERROR_FALSE:
			return {
				...state,
				isError: false,
			};
		case GENRE_CLICKED:
			return {
				...state,
				genre: action.payload,
				genreMovies: [],
				genrePage: 1,
			};
		case SET_DRAWER_OPEN:
			return {
				...state,
				drawerOpen: action.payload,
			};
		case SET_AUTHENTICATED:
			return {
				...state,
				authenticated: action.payload,
			};
		default:
			return state;
	}
}
