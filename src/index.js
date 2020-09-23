import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import { fetchUser, fetchPolls, fetchPollExpiry } from "./redux/actions";

import "bootstrap/dist/css/bootstrap.min.css";

store.dispatch(fetchUser());
store.dispatch(fetchPolls());
store.dispatch(fetchPollExpiry());

const app = (
	<Provider store={store}>
		<App />
	</Provider>
);

ReactDOM.render(app, document.getElementById("root"));
