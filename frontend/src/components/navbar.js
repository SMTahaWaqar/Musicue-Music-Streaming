import React, { useState } from 'react'
import { FcMusic } from 'react-icons/fc'
import {  AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Navbar = () => {

    const [search,setSearch] = useState("");

    // const [searchData, setSearchData] = useState();

    // const handleSearch = () => {
    // axios.get(`https://saavn.me/search/songs?query=${search}`)
    // .then(response => {
    //   console.log(response);
    //   setSearchData(response.data.data.results[0])
    //   })
    // .catch(error => console.error(error))
    // navigate("/search", {state: searchData});
    // }

    let Links = [
        {name:"Home", link:"/"},
        {name:"Liked Songs", link:"/likedSongs"},
        {name:"Custom Playlist", link:"/customPlaylist"},
        {name:"About Us", link:"/aboutUs"},
    ]

    const [open, setOpen] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("loggedIn");
        window.location.reload();
    }

  return (
    <div className='shadow-md w-full sticky top-0 left-0 z-10'>
        <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
            <Link to="/">
            <div className='font=bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800'>
                <span className='text-3xl text-indigo-600 mr-1 pt-2'>
                    <FcMusic />
                </span>
                Musicue
            </div>
            <div onClick={()=>setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
                {open ?
                    <AiOutlineClose />
                :
                    <AiOutlineMenu />
                }
                
            </div>
            </Link>
            <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all ease-in duration-500 ${open ? 'top-20' : 'top-[-490px]'}`}>
                
                <div className="flex items-center">
                    <div className="flex space-x-1">
                        <input
                            type="text"
                            className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder="Search..."
                            value={search}
                            onChange={(e)=>setSearch(e.target.value)}
                        />
                        <Link to="/search" state={search} className="px-4 text-white bg-purple-600 rounded-full flex justify-center">
                        <button className="px-4 text-white bg-purple-600 rounded-full ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </button>
                        </Link>
                    </div>
                </div>

                {
                    Links.map((link) => (
                        <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
                            <Link to={link.link} className="text-gray-800 hover:text-gray-400 duration-500">{link.name}</Link>
                        </li>
                    ))
                }

                <button className='bg-black text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-[#EA0C5C] duration-500 hover:scale-110' onClick={handleLogout}>
                    Logout
                </button>
            </ul>
        </div>
    </div>

  )
}

export default Navbar;