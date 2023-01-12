import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const Album = (props) => {

    const location = useLocation();

    const [albumData, setAlbumData] = useState();

    console.log(location.state);

    const getAlbum = (album) => {
        axios.get(`https://saavn.me/search/albums?query=${album}`)
        .then(res => {
            console.log(res.data.data.results)
            setAlbumData(res.data.data.results[0])
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
      getAlbum(location.state);
    }, [])
    
 
  return (
    <div className='w-full flex flex-col justify-center items-center md:justify-start md:float-left bg-black'>
        {albumData ?
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
            <h4 className='text-xl md:text-4xl text-white'>Featured Artists</h4>
                <h3 className='text-center m-2 bg-[#EA0C50] rounded-xl p-3 text-white'>Artist 1</h3>
                <h3 className='text-center m-2 bg-[#EA0C50] rounded-xl p-3 text-white'>Artist 2</h3>
                <h3 className='text-center m-2 bg-[#EA0C50] rounded-xl p-3 text-white'>Artist 3</h3>
            </div>
            {/* })} */}
            <h4 className='text-xl font-semibold text-white'>Lanuguage : {albumData.language}</h4>
            {albumData.playCount === "" ? <h4 className='text-xl font-semibold text-white'>PlayCount : Not Available</h4> : <h4 className='text-xl font-semibold text-white'>PlayCount : {albumData.playCount}</h4> }
        </div>
        : <h1>Loading</h1>
        }
    </div>
  )
}

export default Album;