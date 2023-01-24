import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BsFillHeartFill } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';

const Album = (props) => {

    const location = useLocation();

    const [albumData, setAlbumData] = useState();

    console.log(location.state);

    const getAlbum = (album) => {
        console.log(album);
        axios.get(`https://saavn.me/albums?id=${album}`)
        .then(res => {
            console.log(res.data.data)
            setAlbumData(res.data.data)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
      getAlbum(location.state);
    }, [])
    
 
  return (
    <div className='w-full h-[full] p-6 flex flex-col justify-center items-center md:justify-start md:float-left bg-black'>
        {albumData ?
        <>
        <div className='flex flex-col justify-center items-center md:justify-start md:float-left m-4'>
            <div className='w-full text-center mb-12'>
                <h5 className='text-base md:text-lg text-[#EA0C5C] mb-1'>Album</h5>
                <h1 className='text-4xl md:text-6xl text-white font-semibold '>{albumData.name}</h1>
            </div>
            <div className='flex justify-center items-center'>
                <img className='h-full w-full' src={albumData.image[2].link} alt="Album Cover" />
            </div>
            {/* {albumData.primaryArtists.map((artist) => { */}
            <hr />
            <div className='float-left mt-10'>
            <h4 className='text-xl md:text-4xl text-white'>Primary Artists</h4>
                <h3 className='text-center m-2 bg-[#EA0C50] rounded-xl p-3 text-white'>{albumData.primaryArtists}</h3>
            </div>
            {/* })} */}
            <h4 className='text-xl font-semibold text-white'>Lanuguage : {albumData.language}</h4>
            {albumData.playCount === "" ? <h4 className='text-xl font-semibold text-white'>Song Count : Not Available</h4> : <h4 className='text-xl font-semibold text-white'>Song Count : {albumData.songCount}</h4> }
        </div>
        

        <div className='flex flex-wrap justify-center md:grid grid-cols-4 gap-4 items-stretch'>
        {albumData.songs.map((song) => (
            <div className="flex justify-center m-4 w-full h-full z-[1]">
            <div className="rounded-lg shadow-lg bg-gray-700 max-w-sm">
            <Link to="/song" state={song.id} data-mdb-ripple="true" data-mdb-ripple-color="light">
                <img className="rounded-t-lg" src={song.image[2].link} alt="Song Cover"/>
            </Link>
            <div className="p-6">
                <h5 className="text-white text-xl font-medium mb-2">{song.name}</h5>
                <p className="text-white text-base mb-4">
                {song.primaryArtists[0].name}
                </p>
                <div className='flex justify-between flex-col'>
                <button type="button" className=" inline-block px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#EA0C5C] hover:shadow-lg focus:bg-[#EA0C5C] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#EA0C5C] active:shadow-lg transition duration-150 ease-in-out my-2 hover:scale-110">Play</button>
                <button type="button" className=" inline-block px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#EA0C5C] hover:shadow-lg focus:bg-[#EA0C5C] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#EA0C5C] active:shadow-lg transition duration-150 ease-in-out my-2 hover:scale-110">Add to Playlist</button>
                <button type="button" className="px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#EA0C5C] hover:shadow-lg focus:bg-[#EA0C5C] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#EA0C5C] active:shadow-lg transition duration-150 ease-in-out my-2 hover:scale-110 flex items-center justify-center"><BsFillHeartFill/></button>
                </div>
            </div>
            </div>
        </div>
        ))}
        </div>


        </>
        : <h1>Loading</h1>
        }
        
    </div>
  )
}

export default Album;