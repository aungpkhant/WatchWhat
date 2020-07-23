import {
    FETCH_TRENDING_INITIATED,
    FETCH_TRENDING_SUCCESS,
    FETCH_TRENDING_FAIL,
    MOVIE_CLICKED,
    GENRE_CLICKED,
    FETCH_MOVIE_INITIATED,
    FETCH_MOVIE_SUCCESS,
    FETCH_MOVIE_FAIL,
    FETCH_TRAILERS_INITIATED,
    FETCH_TRAILERS_SUCCESS,
    FETCH_TRAILERS_FAIL,
    FETCH_UPCOMING_INITIATED,
    FETCH_UPCOMING_SUCCESS,
    FETCH_UPCOMING_FAIL,
    SET_SEARCH_RESULTS,
    SET_IS_ERROR_FALSE,
    FETCH_GENRE_MOVIES_INITIATED,
    FETCH_GENRE_MOVIES_SUCCESS,
    FETCH_GENRE_MOVIES_FAIL,
} from "./types";
import Axios from "axios";
import history from "../util/history";
import {
    youtube,
    API_URL,
    TMDB_API_KEY,
    YOUTUBE_API_KEY,
} from "../api/constants";

// TODO remove api key
const img_url = "https://image.tmdb.org/t/p/";
// backdrop_sizes: ["w300", "w780", "w1280", "original"],
// logo_sizes: ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
// poster_sizes: [
//     "w92",
//     "w154",
//     "w185",
//     "w342",
//     "w500",
//     "w780",
//     "original",
// ],
// profile_sizes: ["w45", "w185", "h632", "original"],
// still_sizes: ["w92", "w185", "w300", "original"],

// TODO delete this
// https://www.googleapis.com/youtube/v3/videos?id=eyzxu26-Wqk,5Byeq_hyh2U,zN2iULAs8Os&part=snippet,contentDetails,statistics&key=AIzaSyD_XRl-Uq5DprO_R7Cpc7j93yePjAm2WKE

export const fetchTrending = (pageNo) => async (dispatch) => {
    dispatch({ type: FETCH_TRENDING_INITIATED });

    const url = `${API_URL}discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${pageNo}`;

    try {
        const trendingMovies = await Axios.get(url);

        await Promise.all(
            trendingMovies.data.results.map(async (movie) => {
                const movieDetails = await Axios.get(
                    `${API_URL}movie/${movie.id}?api_key=${TMDB_API_KEY}&&language=en-US`
                );

                movie.details = movieDetails.data;
            })
        );
        dispatch({
            type: FETCH_TRENDING_SUCCESS,
            payload: trendingMovies.data.results,
        });
    } catch (error) {
        dispatch({ type: FETCH_TRENDING_FAIL });
        console.log(error);
    }
};

export const fetchMovie = (movie_id) => async (dispatch) => {
    dispatch({ type: FETCH_MOVIE_INITIATED });

    //&&language=en-US&append_to_response=credits,videos,images&include_image_language=en,null
    const url = `${API_URL}movie/${movie_id}?api_key=${TMDB_API_KEY}&&language=en-US&append_to_response=credits,videos,images&include_image_language=en,null`;

    try {
        const movie = await Axios.get(url);
        dispatch({ type: FETCH_MOVIE_SUCCESS, payload: movie.data });
    } catch (error) {
        dispatch({ type: FETCH_MOVIE_FAIL });
        console.log(error);
    }
};

export const handleMovieClick = (id) => async (dispatch) => {
    dispatch({ type: MOVIE_CLICKED, payload: id });

    let navigationPath = `${process.env.PUBLIC_URL}/movies/${id}/details`;
    history.push(navigationPath);
};

export const handleGenreClick = (genre) => (dispatch) => {
    dispatch({ type: GENRE_CLICKED, payload: genre });
    let navigationPath = `${process.env.PUBLIC_URL}/genre/${genre}`;
    history.push(navigationPath);
};

export const setSearchResults = (results) => async (dispatch) => {
    dispatch({ type: SET_SEARCH_RESULTS, payload: results });
};
export const setIsErrorToFalse = () => async (dispatch) => {
    dispatch({ type: SET_IS_ERROR_FALSE });
};

export const fetchTrailers = (trailer_ids) => async (dispatch) => {
    dispatch({ type: FETCH_TRAILERS_INITIATED });

    try {
        const trailers = await youtube.get("/videos", {
            params: {
                id: trailer_ids,
                part: "snippet,contentDetails,statistics",
                key: YOUTUBE_API_KEY,
            },
        });
        console.log(trailers);

        dispatch({
            type: FETCH_TRAILERS_SUCCESS,
            payload: trailers.data.items,
        });
    } catch (error) {
        dispatch({ type: FETCH_TRAILERS_FAIL });
        console.log(error);
    }
};

export const fetchUpcoming = (pageNo) => async (dispatch) => {
    dispatch({ type: FETCH_UPCOMING_INITIATED });

    const url = `${API_URL}movie/upcoming?api_key=${TMDB_API_KEY}&language-en-US&page=${pageNo}`;

    try {
        const upcoming = await Axios.get(url);

        dispatch({
            type: FETCH_UPCOMING_SUCCESS,
            payload: upcoming.data.results,
        });
    } catch (error) {
        dispatch({ type: FETCH_UPCOMING_FAIL });
        console.log(error);
    }
};

export const fetchGenre = (genre_id, pageNo) => async (dispatch) => {
    dispatch({ type: FETCH_GENRE_MOVIES_INITIATED });

    const url = `${API_URL}discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genre_id}&page=${pageNo}`;

    try {
        const movies = await Axios.get(url);

        dispatch({
            type: FETCH_GENRE_MOVIES_SUCCESS,
            payload: movies.data.results,
        });
    } catch (error) {
        dispatch({
            type: FETCH_GENRE_MOVIES_FAIL,
        });
        console.log(error);
    }
};
