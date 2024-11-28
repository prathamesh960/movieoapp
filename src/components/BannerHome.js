// import React from 'react';
// import { useSelector } from 'react-redux';

// const BannerHome = () => {

//     const bannerData = useSelector(state => state.movieData.bannerData); // Corrected selector
//   const imageURL = useSelector(state => state.movieData.imageURL);     // Corrected selector

//     console.log("bannerData", bannerData);


//     return (

//         <section className='w-full h-full'>
//             <div className='flex-min-h-full max-h-[95vh]'>
//                 {
//                     bannerData.map((data, index) => {

//                         return (
//                             <div className='min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative '>

//                                 <div className='w-full h-full'>
//                                      <img
//                                          src={imageURL + data.backdrop_path}
//                                         className='h-full w-full  object-cover'
//                                       />
//                                 </div>                              
//                             </div>
//                         )
//                     })
//                 }
//             </div>
//         </section>
//     )
// }

// export default BannerHome;



// import React from 'react';
// import { useSelector } from 'react-redux';

// const BannerHome = () => {
//   const bannerData = useSelector(state => state.movieData.bannerData); // Corrected selector
//   const imageURL = useSelector(state => state.movieData.imageURL);     // Corrected selector

//   console.log("bannerData", bannerData);

//   return (
//     <section className='w-full h-full'>
//       <div>
//         {bannerData?.map((data, index) => (


//           <div key={index}>
//             <img src={imageURL + data.backdrop_path} alt="Banner" />
//           </div>

//         ))}
//       </div>
//     </section>
//   );
// };

// export default BannerHome;



// import React from 'react';
// import { useSelector } from 'react-redux';

// const BannerHome = () => {
//     // Selecting data from Redux store
//     const bannerData = useSelector((state) => state.movieData?.bannerData || []); // Fallback to empty array
//     const imageURL = useSelector((state) => state.movieData?.imageURL || "");    // Fallback to empty string

//     console.log("bannerData", bannerData);

//     // Render component
//     return (
//         <section className="w-full h-full">
//             <div className="flex min-h-full max-h-[95vh]">
//                 {bannerData.length > 0 ? (
//                     bannerData.map((data, index) => (


//                         <div
//                             key={index} // Always use a unique key
//                             className="min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative"
//                         >
//                             <div className="w-full h-full">
//                                 <img
//                                     src={imageURL + data.backdrop_path} // Constructing image URL
//                                     alt={`Banner ${index}`} // Add an alt attribute for accessibility
//                                     className="h-full w-full object-cover"
//                                 />
//                             </div>



//                         </div>
//                     ))
//                 ) : (
//                     <p className="text-center w-full">No banners available</p> // Fallback if bannerData is empty
//                 )}

//                 <div className='container mx-auto absolute bottom-0 max-w-md px-3'>
//                         <h2 className='font-bold text-2xl'> {data.title}</h2>

//                         <p>{data.overview}</p>
//                 </div>

//             </div>
//         </section>
//     );
// };

// export default BannerHome;


import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const BannerHome = () => {
    // Selecting data from Redux store
    const bannerData = useSelector((state) => state.movieData?.bannerData || []); // Fallback to empty array
    const imageURL = useSelector((state) => state.movieData?.imageURL || "");    // Fallback to empty string
    const [currentImage, setCurrentImage] = useState(0);

    console.log("bannerData", bannerData);

    const handleNext = () => {
        if (currentImage < bannerData.length - 1) {
            setCurrentImage((prev) => prev + 1);
        } else {
            setCurrentImage(0); // Loop back to the first image
        }
    };

    const handlePrevious = () => {
        if (currentImage > 0) {
            setCurrentImage((prev) => prev - 1);
        } else {
            setCurrentImage(bannerData.length - 1); // Loop back to the last image
        }
    };

    // Automatic sliding logic
    useEffect(() => {
        const interval = setInterval(() => {
            handleNext(); // Move to the next image
        }, 5000);

        return () => clearInterval(interval); // Cleanup on unmount or dependency change
    }, [currentImage, imageURL ,bannerData]); // Add currentImage and bannerData as dependencies

    // Render component
    return (
        // <section className="w-full h-full">
        //     <div className="flex min-h-full max-h-[95vh] overflow-hidden">
        //         {bannerData.length > 0 ? (
        //             bannerData.map((data, index) => (
        //                 <div
        //                     key={data.id+"bannerHome" + index}
        //                     key={index} // Always use a unique key
        //                     className="min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-all"
        //                     style={{ transform: `translateX(-${currentImage * 100}%)` }}
        //                 >
        //                     <div className="w-full h-full">
        //                         <img
        //                             src={imageURL + data.backdrop_path} // Constructing image URL
        //                             alt={`Banner ${index}`} // Add an alt attribute for accessibility
        //                             className="h-full w-full object-cover"
        //                         />
        //                     </div>

        //                     {/* Buttons for next and previous images */}
        //                     <div className="absolute top-0 w-full h-full hidden flex items-center justify-between px-4 group-hover:lg:flex">
        //                         <button
        //                             onClick={handlePrevious}
        //                             className="bg-white p-1 rounded-full text-xl z-10 text-black"
        //                         >
        //                             <FaAngleLeft />
        //                         </button>

        //                         <button
        //                             onClick={handleNext}
        //                             className="bg-white p-1 rounded-full text-xl z-10 text-black"
        //                         >
        //                             <FaAngleRight />
        //                         </button>
        //                     </div>

        //                     {/* Banner Content */}
        //                     <div className="container mx-auto">
        //                         <div className="container mx-auto w-full absolute bottom-0 max-w-md px-3">
        //                             <h2 className="font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl">
        //                                 {data?.title || data?.name}
        //                             </h2>
        //                             <p className="text-ellipsis line-clamp-3 my-2">{data.overview}</p>

        //                             <div className="flex items-center gap-4">
        //                                 <p>Rating: {Number(data.vote_average).toFixed(1)}+</p>
        //                                 <span></span>
        //                                 <p>View: {Number(data.popularity).toFixed(0)}</p>
        //                             </div>

        //                             <button className="bg-white px-4 py-2 text-black font-bold rounded mt-4 hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all hover:scale-105">
        //                                 Play Now
        //                             </button>
        //                         </div>
        //                     </div>
        //                 </div>
        //             ))
        //         ) : (
        //             <p className="text-center w-full">No banners available</p> // Fallback if bannerData is empty
        //         )}
        //     </div>
        // </section>

        <section className="w-full h-full">
    <div className="flex min-h-full max-h-[95vh] overflow-hidden">
        {bannerData.length > 0 ? (
            bannerData.map((data, index) => (
                <div
                    key={data.id + "bannerHome" + index} // Ensure the key is unique
                    className="min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-all"
                    style={{ transform: `translateX(-${currentImage * 100}%)` }}
                >
                    <div className="w-full h-full">
                        <img
                            src={imageURL + data.backdrop_path} // Constructing image URL
                            alt={`Banner ${index}`} // Add an alt attribute for accessibility
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {/* Buttons for next and previous images */}
                    <div className="absolute top-0 w-full h-full hidden flex items-center justify-between px-4 group-hover:lg:flex">
                        <button
                            onClick={handlePrevious}
                            className="bg-white p-1 rounded-full text-xl z-10 text-black"
                        >
                            <FaAngleLeft />
                        </button>

                        <button
                            onClick={handleNext}
                            className="bg-white p-1 rounded-full text-xl z-10 text-black"
                        >
                            <FaAngleRight />
                        </button>
                    </div>

                    {/* Banner Content */}
                    <div className="container mx-auto">
                        <div className="container mx-auto w-full absolute bottom-0 max-w-md px-3">
                            <h2 className="font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl">
                                {data?.title || data?.name}
                            </h2>
                            <p className="text-ellipsis line-clamp-3 my-2">{data.overview}</p>

                            <div className="flex items-center gap-4">
                                <p>Rating: {Number(data.vote_average).toFixed(1)}+</p>
                                <span></span>
                                <p>View: {Number(data.popularity).toFixed(0)}</p>
                            </div>

                            <button className="bg-white px-4 py-2 text-black font-bold rounded mt-4 hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all hover:scale-105">
                                Play Now
                            </button>
                        </div>
                    </div>
                </div>
            ))
        ) : (
            <p className="text-center w-full">No banners available</p> // Fallback if bannerData is empty
        )}
    </div>
</section>

    );
};

export default BannerHome;
