import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpcoming } from "../../redux/actions";
import MovieListPage from "../MovieListPage/MovieListPage";

export default function Trending() {
    const upcoming = useSelector((state) => state.upcoming);
    const pageNo = useSelector((state) => state.upcomingPage);

    return (
        <MovieListPage
            actionCreator={fetchUpcoming}
            categorySelector={upcoming}
            categoryPageSelector={pageNo}
        />
    );
}
