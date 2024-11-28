import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetchDetails from "../components/hooks/useFetchDetails";
import useFetch from "../components/hooks/useFetch";
import Divider from "../components/Divider";
import HorizontalScollCard from "../components/HorizontalScollCard";
import moment from "moment"; // Ensure this is installed

const DetailsPage = () => {
  const params = useParams(); // Retrieve route parameters
  const imageURL = useSelector((state) => state.movieData?.imageURL || "");

  // Fetch data for the details, cast, similar items, and recommendations
  const { data } = useFetchDetails(`/${params?.explore}/${params?.id}`);
  const { data: castData } = useFetchDetails(`/${params?.explore}/${params?.id}/credits`);
  const { data: similarData } = useFetch(`/${params?.explore}/${params?.id}/similar`);
  const { data: recommendationData } = useFetch(`/${params?.explore}/${params?.id}/recommendations`);

  const duration = (data?.runtime / 60)?.toFixed(1)?.split(".");
  const writer = castData?.crew
    ?.filter((el) => el?.job === "Writer")
    ?.map((el) => el?.name)
    ?.join(", ");

  return (
    <div>
      {/* Backdrop Image */}
      <div className="w-full h-[280px] relative hidden lg:block">
        <div className="w-full h-full">
          <img
            src={imageURL + data?.backdrop_path}
            alt="Backdrop"
            className="h-full w-full object-cover"
          />
          <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10">
        {/* Poster Image */}
        <div className="relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60">
          <img
            src={imageURL + data?.poster_path}
            alt="Poster"
            className="h-80 w-60 object-cover rounded"
          />
        </div>

        {/* Details Section */}
        <div>
          <h2 className="text-2xl lg:text-4xl font-bold text-white">{data?.title || data?.name}</h2>
          <p className="text-neutral-400">{data?.tagline || "No Tagline"}</p>

          <Divider />

          <div className="flex items-center gap-3">
            <p>Rating: {Number(data?.vote_average || 0).toFixed(1)}</p>
            <span>|</span>
            <p>Votes: {Number(data?.vote_count || 0)}</p>
            <span>|</span>
            <p>Duration: {duration ? `${duration[0]}h ${duration[1]}m` : "N/A"}</p>
          </div>

          <Divider />

          {/* Overview Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Overview</h3>
            <p>{data?.overview || "No Overview Available"}</p>

            <Divider />

            <div className="flex items-center gap-3 my-3 text-center">
              <p>Status: {data?.status || "N/A"}</p>
              <span>|</span>
              <p>Release Date: {moment(data?.release_date).format("MMMM Do YYYY") || "N/A"}</p>
              <span>|</span>
              <p>Revenue: ${data?.revenue?.toLocaleString() || "N/A"}</p>
            </div>

            <Divider />
          </div>

          {/* Director and Writer */}
          <div>
            <p>
              <span className="text-white">Director</span>:{" "}
              {castData?.crew?.find((el) => el?.job === "Director")?.name || "N/A"}
            </p>
            <Divider />
            <p>
              <span className="text-white">Writer</span>: {writer || "N/A"}
            </p>
          </div>

          <Divider />

          {/* Cast Section */}
          <h2 className="font-bold text-lg">Cast:</h2>
          <div className="grid grid-cols-[repeat(auto-fit,96px)] gap-5">
            {castData?.cast
              ?.filter((el) => el?.profile_path)
              ?.map((starCast, index) => (
                <div key={index}>
                  <div>
                    <img
                      src={imageURL + starCast?.profile_path}
                      alt={starCast?.name}
                      className="w-24 h-24 object-cover rounded-full"
                    />
                  </div>
                  <p className="font-bold text-center text-sm text-neutral-400">{starCast?.name}</p>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Similar and Recommendations */}
      <div>
        <HorizontalScollCard
          data={similarData}
          heading={"Similar " + params?.explore}
          media_type={params?.explore}
        />
        <HorizontalScollCard
          data={recommendationData}
          heading={"Recommendations " + params?.explore}
          media_type={params?.explore}
        />
      </div>
    </div>
  );
};

export default DetailsPage;
