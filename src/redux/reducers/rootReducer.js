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
    INCREMENT_TRENDING_PAGE,
} from "../types";

const initialState = {
    trending: [],
    trendingPage: 1,
    upcoming: [],
    upcomingPage: 1,
    isLoading: false,
    isError: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_TRENDING_INITIATED:
        case FETCH_UPCOMING_INITIATED:
        case FETCH_MOVIE_INITIATED:
        case FETCH_TRAILERS_INITIATED:
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

        default:
            return state;
    }
}
