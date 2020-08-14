import React from "react";
import "./App.css";
import { MainContainer } from "./components/index";
import SimpleReactLightbox from "simple-react-lightbox";

function App() {
    return (
        <SimpleReactLightbox>
            <div className="App">
                <MainContainer />
            </div>
        </SimpleReactLightbox>
    );
}

export default App;
