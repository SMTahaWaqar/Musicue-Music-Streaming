import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const Song = () => {
    const location = useLocation();

    const [songData, setSongData] = useState();

    console.log(location.state);

    const getAlbum = (song) => {
        axios.get(`https://saavn.me/search/songs?query=${song}`)
        .then(res => {
            console.log(res.data.data.results)
            setSongData(res.data.data.results[0])
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
      getAlbum(location.state);
    }, [])
    
 
  return (
    <div className='w-full flex flex-col justify-center items-center md:justify-start md:float-left'>
        {songData ?
        <div className='flex flex-col justify-center items-center md:justify-start md:float-left m-4'>
            <div className='w-full text-center mb-12'>
                <h5 className='text-base md:text-lg text-indigo-700 mb-1'>Song</h5>
                <h1 className='text-4xl md:text-6xl text-gray-700 font-semibold '>{songData.name}</h1>
            </div>
            <div className='flex justify-center items-center'>
                <img className='h-full w-full' src={songData.image[2].link} alt="Album Cover" />
            </div>
            {/* {albumData.primaryArtists.map((artist) => { */}
            <hr />
            <div className='float-left mt-10'>
                <h4 className='text-xl md:text-4xl '>Featured Artists</h4>
                <h3 className='text-center m-2 bg-cyan-500 rounded-xl p-3'>Artist 1</h3>
                <h3 className='text-center m-2 bg-cyan-500 rounded-xl p-3'>Artist 2</h3>
                <h3 className='text-center m-2 bg-cyan-500 rounded-xl p-3'>Artist 3</h3>
            </div>
            {/* })} */}
            <h4 className='text-xl font-semibold'>Lanuguage : {songData.language}</h4>
            {songData.playCount === "" ? <h4 className='text-xl font-semibold'>PlayCount : Not Available</h4> : <h4 className='text-xl font-semibold'>PlayCount : {songData.playCount}</h4> }
        </div>
        : <h1>Loading</h1>
        }
    </div>
  )
}

export default Song;