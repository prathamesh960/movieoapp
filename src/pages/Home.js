import React, { useEffect, useState } from "react";
import BannerHome from '../components/BannerHome';
import { useSelector } from "react-redux";
import axios from 'axios';
import Card from '../components/Card';
import HorizontalScollCard from "../components/HorizontalScollCard";
import useFetch from "../components/hooks/useFetch";

const Home = () => {
  // Fetching trending data from Redux store
  const trendingData = useSelector(state => state.movieData?.bannerData || []); // Ensure consistency in state

  const { data: nowPlayingData } = useFetch('/movie/now_playing')
  const { data: topRateData } = useFetch('/movie/top_rated')
  const { data: popularTvShowData } = useFetch('/tv/popular')
  const { data: onTheAirShowData } = useFetch('/tv/on_the_air')






  // Log the trending data for debugging
  console.log('Trending Data:', trendingData);

  return (
    <div>
      <BannerHome />

      <HorizontalScollCard data={trendingData} heading={"Trending"} trending={true} />

      <HorizontalScollCard data={nowPlayingData} heading={"Now Playing"} media_type={ "movie"} />
      <HorizontalScollCard data={topRateData} heading={"Top Rated Movies"} media_type={ "movie"}/>
      <HorizontalScollCard data={popularTvShowData} heading={"Popular TV Show"} media_type={ "tv"}/>
      <HorizontalScollCard data={onTheAirShowData} heading={"On The Air"} media_type={ "tv"}/>

    </div>
  );
}

export default Home;
