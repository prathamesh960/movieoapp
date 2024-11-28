// import React from "react";
// import logo from '../assets/logo.png';
// //import { NavLink } from 'react-router-dom';
// import {NavLink} from 'react-router-dom'


// const Header = ()=>{


//     const navigation = [

//         { 
//             label: "Tv Shows ",
//             href: 'tv',
//         },
//         {
//             label: "Movies",
//             href: "movie"
//         }
//     ]

//     return(

//         <header className='fixed top-0 w-full h-16 bg-neutral-600 bg-opacity-75'>

//                 <div className='container mx-auto px-2  flex items-center h-full'>

//                 <div>
//                     <img src={logo} alt='logo' width={120} /> 
//                 </div>


//                 <nav className='flex items-center gap-1 ml-5'>
//                     {
//                         navigation.map((nav , index) =>{

//                             return(
//                                 <div>

//                                     <NavLink key={nav.label} to={nav.href}>
//                                         {nav.label}
//                                     </NavLink>
//                                 </div>
//                             )
//                         })
//                     }

//                 </nav>

//                 </div>
//         </header>
//     )
// }

// export default Header;



import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import userIcon from '../assets/user.png';
import { IoCode, IoSearchOutline } from "react-icons/io5";
import { navigation } from "../contants/navigation";

//import MobileNavigation from "./MobileNavigation";


const Header = () => {

    const location =useLocation()
    const removeSpace = location?.search?.slice(3).split("%20")?.join("")

    const [searchInput, setSearchInput] = useState(removeSpace)
    console.log("removeSpace",removeSpace)
    const navigate = useNavigate()


    console.log("location");



    useEffect(() => {

        if(searchInput){
            navigate(`/search?q=${searchInput}`)

        }

    }, [searchInput])


    const handleSubmit = (e) => {

        e.preventDefault()

    }

    return (
        <header className="fixed top-0 w-full h-16 bg-black bg-opacity-50 z-40">
            <div className="container mx-auto px-3 flex items-center h-full">
                {/* Logo Section */}
                <Link to={"/"}>
                    <img src={logo} alt="logo" width={120} />
                </Link>


                <nav className=' hidden lg:flex items-center gap-1 ml-5 '>

                    {
                        navigation.map((nav, index) => {

                            return (

                                <div>
                                    <NavLink key={nav.label} to={nav.href} className={({ isActive }) => `px-2 hover:text-neutral-100 ${isActive && "text-neutral-100"}`}>
                                        {nav.label}
                                    </NavLink>
                                </div>
                            )

                        })
                    }
                </nav>


                <div className='ml-auto flex item-center gap-5'>


                    <div>
                        <form className='flex items-center gap-2 ' onSubmit={handleSubmit}>
                            <input type='text' placeholder='Search here...' className='bg-transparent px-4 py-1 putline-none border-none hidden lg:block'
                                onChange={(e) => setSearchInput(e.target.value)}
                                value={searchInput}
                            />

                            <button className='text-2xl text-white'>

                                <IoSearchOutline />
                            </button>
                        </form>
                    </div>



                    <div className='w-8 h-8 rounded-full overflow-hidden cursor-pointer active:scale-50 transition-all'>
                        <img src={userIcon} width='w-ful h-full' />
                    </div>
                </div>


            </div>
        </header>
    );
};

export default Header;
