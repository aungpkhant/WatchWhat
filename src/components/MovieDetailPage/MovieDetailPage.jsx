import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovie } from "../../redux/actions";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import {
    MovieDetail,
    MoviePlayer,
    MoviePageFooter,
    MovieTrailers,
    MovieCastCrew,
    MovieImages,
    HorizontalWrapper,
    VerticalWrapper,
} from "../index";

export default function MovieDetailPage(props) {
    const dispatch = useDispatch();
    const { path } = useRouteMatch();
    const movie_id = props.match.params.id;
    const [trailerId, setTrailerId] = useState(null);
    const movie = useSelector((state) => state.movie);

    //TODO provide default backdrop if not exists
    const mainBackDrop = movie ? movie.backdrop_path : null;
    const [bd1, bd2, bd3] = movie ? movie.images.backdrops : [];

    useEffect(() => {
        dispatch(fetchMovie(movie_id));
    }, []);

    const page = movie ? (
        <div>
            <Switch>
                <Route path={`${path}/details`}>
                    <HorizontalWrapper backdrop={mainBackDrop}>
                        <MovieDetail />
                    </HorizontalWrapper>
                </Route>
                <Route path={`${path}/trailers`}>
                    <VerticalWrapper
                        backdrop={bd1 ? bd1.file_path : mainBackDrop}
                    >
                        <MovieTrailers {...props} setTrailerId={setTrailerId} />
                        <MoviePlayer trailerId={trailerId} />s
                    </VerticalWrapper>
                </Route>
                <Route path={`${path}/cast-and-crew`}>
                    <VerticalWrapper
                        backdrop={bd2 ? bd2.file_path : mainBackDrop}
                    >
                        <MovieCastCrew {...props} />
                    </VerticalWrapper>
                </Route>
                <Route path={`${path}/images`}>
                    <VerticalWrapper
                        backdrop={bd3 ? bd3.file_path : mainBackDrop}
                    >
                        <MovieImages {...props} />
                    </VerticalWrapper>
                </Route>
            </Switch>
            <MoviePageFooter />
        </div>
    ) : null;

    return page;
}

// TODO remove this
// If there are less than 4 images (1 for each page), modulo will prevent index out of range and reuse backdrops
// const backdrop = movie
//     ? movie.images.backdrops[1 % movie.images.backdrops.length].file_path
// : null;
