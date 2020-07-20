import React from "react";
import "./App.css";
import { MainContainer } from "./components/index";
import { Provider } from "react-redux";
import store from "./redux/store";
import SimpleReactLightbox from "simple-react-lightbox";

function App() {
    return (
        <Provider store={store}>
            <SimpleReactLightbox>
                <div className="App">
                    <MainContainer />
                </div>
            </SimpleReactLightbox>
        </Provider>
    );
}

export default App;
