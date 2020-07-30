import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrending } from "../../redux/actions";
import MovieListPage from "../MovieListPage/MovieListPage";

export default function Trending() {
    const trending = useSelector((state) => state.trending);
    const pageNo = useSelector((state) => state.trendingPage);

    return (
        <MovieListPage
            actionCreator={fetchTrending}
            categorySelector={trending}
            categoryPageSelector={pageNo}
        />
    );
}
