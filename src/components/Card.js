// import React from 'react';
// import { useSelector } from 'react-redux';
// import moment from 'moment';
// import { Link } from 'react-router-dom';

// const Card = ({ data, trending, index, media_type }) => {
//     // Fetching image URL from Redux store
//     const imageURL = useSelector((state) => state.movieData?.imageURL || ""); // Consistent state name

//     const mediaType = data.media_type ?? media_type

//     // Fallback image in case poster_path is missing
//     const posterImage = data?.poster_path ? imageURL + data.poster_path : "/path/to/fallback-image.jpg";

//     return (
//         <Link to={"/" + mediaType + "/" + data.id} className='w-full min-w-[230px] max-w-[230px] h-80 overflow-hidden block rounded relative hover:scale-105 transition-all'>


//             {/* {

//             data?poster_path ?(

//                 <img
//                 src={posterImage}
//                 alt={data?.title || "Trending Show"}
//                 className="w-full h-full object-cover"
//             />
//             ) :(
//                 <div>
//                     no image
//                 </div>
//             )
//           } */}
//             {
//                 data?.poster_path ? (
//                     <img
//                         src={posterImage}
//                         alt={data?.title || "Trending Show"}
//                         className="w-full h-full object-cover"
//                     />
//                 ) : (
//                     <div className='bg-neutral-800 h-full w-full flex justify-center items-center'>
//                         No image
//                     </div>
//                 )
//             }



//             <div className='absolute  top-4'>
//                 {
//                     trending && (
//                         <div className='py-1 px-4  backdrop-blur-3xl rounded-r-full bg-black/60 overflow-hidden'>
//                             #{index} Trending
//                         </div>
//                     )
//                 }
//             </div>


//             <div className='absolute bottom-0 h-16 backdrop-blur-3xl w-full bg-black/60 p-2  '>

//                 <h2 className='text-ellipsis line-clamp-1 text-lg font-semibold'>{data?.title || data?.name}</h2>

//                 <div className='text-sm text-neutral-400 flex justify-between items-center'>
//                     <p>{moment(data.release_date).format("MMMM Do YYYY")}</p>

//                     <p className='bg-black px-1 rounded-full text-xs text-white'> Rating: {Number(data.vote_average).toFixed(1)}</p>
//                 </div>
//             </div>

//         </Link>
//     );
// }

// export default Card;



import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

const Card = ({ data, trending, index, media_type }) => {
  // Fetching image URL from Redux store
  const imageURL = useSelector((state) => state.movieData?.imageURL || "");

  // Fallback to media_type prop if data.media_type is undefined
  const mediaType = data?.media_type ?? media_type;

  // Fallback image in case poster_path is missing
  const posterImage = data?.poster_path
    ? `${imageURL}${data.poster_path}`
    : "/path/to/fallback-image.jpg";

  return (
    <Link
      to={`/${mediaType}/${data.id}`}
      className="w-full min-w-[230px] max-w-[230px] h-80 overflow-hidden block rounded relative hover:scale-105 transition-all"
    >
      {/* Poster Image or Fallback */}
      {data?.poster_path ? (
        <img
          src={posterImage}
          alt={data?.title || "Trending Show"}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="bg-neutral-800 h-full w-full flex justify-center items-center text-white">
          No image
        </div>
      )}

      {/* Trending Badge */}
      {trending && (
        <div className="absolute top-4 py-1 px-4 backdrop-blur-3xl rounded-r-full bg-black/60 overflow-hidden">
          #{index} Trending
        </div>
      )}

      {/* Card Footer */}
      <div className="absolute bottom-0 h-16 backdrop-blur-3xl w-full bg-black/60 p-2">
        <h2 className="text-ellipsis line-clamp-1 text-lg font-semibold">
          {data?.title || data?.name}
        </h2>
        <div className="text-sm text-neutral-400 flex justify-between items-center">
          <p>{moment(data?.release_date).format("MMMM Do YYYY")}</p>
          <p className="bg-black px-1 rounded-full text-xs text-white">
            Rating: {Number(data?.vote_average).toFixed(1)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
