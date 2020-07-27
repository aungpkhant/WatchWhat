import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";

const middleware = [thunk];
const initialState = {
    trending: [],
    trendingPage: 1,
    upcoming: [],
    upcomingPage: 1,
    genre: null,
    genreMovies: [],
    genrePage: 1,
    isError: false,
    isLoading: false,
    searchResults: [],
    drawerOpen: true,
};

let store;

if (process.env.NODE_ENV == "development") {
    store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...middleware),
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
                window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );
} else if (process.env.NODE_ENV == "production") {
    store = createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware))
    );
}

export default store;
