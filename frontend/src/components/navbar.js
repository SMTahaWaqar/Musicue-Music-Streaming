import React, { useState } from 'react'
import { FcMusic } from 'react-icons/fc'
import {  AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Navbar = () => {

    let Links = [
        {name:"Home", link:"/"},
        {name:"Liked Songs", link:"/likedSongs"},
        {name:"Custom Playlist", link:"/customPlaylist"},
        {name:"Profile", link:"/"},
        {name:"About Us", link:"/"},
    ]

    const [open, setOpen] = useState(false)

  return (
    <div className='shadow-md w-full sticky top-0 left-0'>
        <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
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
            <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all ease-in duration-500 ${open ? 'top-20' : 'top-[-490px]'}`}>
                {
                    Links.map((link) => (
                        <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
                            <Link to={link.link} className="text-gray-800 hover:text-gray-400 duration-500">{link.name}</Link>
                        </li>
                    ))
                }

                <button className='bg-indigo-600 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 duration-500'>
                    Profile
                </button>
            </ul>
        </div>
    </div>

  )
}

export default Navbar;