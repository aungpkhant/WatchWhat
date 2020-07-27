import { createBrowserHistory } from "history";

let history;

if (process.env.NODE_ENV == "development") {
    history = createBrowserHistory({
        basename: "/WatchWhat",
    });
} else if (process.env.NODE_ENV == "production") {
    history = createBrowserHistory({
        basename: "/WatchWhat",
    });
}

export default history;
