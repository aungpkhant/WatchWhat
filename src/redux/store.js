import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/rootReducer";
import thunkMiddleware from "redux-thunk";

const initialState = {
	authenticated: false,
	poll_expire: Date.now(),
	polls: [],
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
	drawerOpen: false,
};

/* eslint-disable no-underscore-dangle */
// This enables the redux dev tools extension, or does nothing if not installed
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

// if (process.env.NODE_ENV == "development") {
// 	store = createStore(
// 		rootReducer,
// 		initialState,
// 		compose(
// 			applyMiddleware(...middleware),
// 			window.__REDUX_DEVTOOLS_EXTENSION__ &&
// 				window.__REDUX_DEVTOOLS_EXTENSION__()
// 		)
// 	);
// } else if (process.env.NODE_ENV == "production") {
// 	store = createStore(
// 		rootReducer,
// 		initialState,
// 		compose(applyMiddleware(...middleware))
// 	);
// }
const store = createStore(
	rootReducer,
	initialState,
	composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
