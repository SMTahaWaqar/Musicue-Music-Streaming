import React from 'react'
import { likedSongs } from '../data'
import { BsFillHeartFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const LikedSongs = () => {


  return (
    <div className='h-full bg-black'>
        <div className='md:h-full items-center text-gray-600'>
            <div className='container flex flex-col px-5 py-24 mx-auto'>
                <div className='text-center mb-12'>
                    <h5 className='text-base md:text-lg text-[#EA0C50] mb-1'>Your Own Playlist</h5>
                    <h1 className='text-4xl md:text-6xl text-white font-semibold'>Custom Playlist</h1>
                </div>
            </div>

            {likedSongs ?
                <div className='flex flex-wrap items-centerz justify-center md:grid grid-cols-4 gap-4 items-stretch'>
                    {likedSongs.map((song) => (
                    <div class="flex justify-center m-4 w-[80%] h-full z-[1]">
                    <div class="rounded-lg shadow-lg bg-gray-700 max-w-sm">
                        <Link to="/song" state={song.name} data-mdb-ripple="true" data-mdb-ripple-color="light">
                            <img className="rounded-t-lg" src={song.image[2].link} alt="Song Cover"/>
                        </Link>
                        <div class="p-6">
                        <h5 class="text-white text-xl font-medium mb-2">{song.name}</h5>
                        <p class="text-white text-base mb-4">
                            {song.primaryArtists}
                        </p>
                        <div className='flex flex-col'>
                          <button type="button" className=" inline-block px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#EA0C5C] hover:shadow-lg focus:bg-[#EA0C5C] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#EA0C5C] active:shadow-lg transition duration-150 ease-in-out my-2 hover:scale-110">Play</button>
                          <button type="button" className=" inline-block px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#EA0C5C] hover:shadow-lg focus:bg-[#EA0C5C] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#EA0C5C] active:shadow-lg transition duration-150 ease-in-out my-2 hover:scale-110 flex items-center justify-center"><BsFillHeartFill /></button>
                        </div>
                        </div>
                    </div>
                    </div>
                    ))}
                </div>
                : <div>Loading</div>
            }

        </div>
    </div>
  )
}

export default LikedSongs