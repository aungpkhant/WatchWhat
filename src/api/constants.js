// refer to config.js for sizing options
import Axios from "axios";

export const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
export const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
export const api_img_url_500 = "https://image.tmdb.org/t/p/w500";
export const api_img_url_780 = "https://image.tmdb.org/t/p/w780";
export const api_img_url_OG = "https://image.tmdb.org/t/p/original";
export const youtube_base_url = "https://www.googleapis.com/youtube/v3/";
export const API_URL = "https://api.themoviedb.org/3/";
export const YOUTUBE_EMBED_LINK = "https://www.youtube.com/embed/";
export const CORS_ANYWHERE_LINK = "https://cors-anywhere.herokuapp.com/";
export const TMDB_QUERY_LINK = (query) =>
    `${CORS_ANYWHERE_LINK}${API_URL}search/movie?query=${query}&api_key=${TMDB_API_KEY}`;

export const youtube = Axios.create({
    baseURL: youtube_base_url,
});
