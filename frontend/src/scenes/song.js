import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const Song = () => {

    const [currentSong, setCurrentSong] = useState();

    const [playSong, setPlaySong] = useState();

    const location = useLocation();

    const [songData, setSongData] = useState();

    console.log(location.state);

    // const getSong = (song) => {
    //     console.log(song);
    //     axios.get(`https://saavn.me/songs?id=${song}`)
    //     .then(res => {
    //         console.log(res.data.data[0])
    //         setSongData(res.data.data[0])
    //     })
    //     .catch(err => console.log(err))
    // }

    

    useEffect(() => {
    //   getSong(location.state);

      axios.get(`https://saavn.me/songs?id=${location.state}`)
        .then(res => {
            console.log(res.data.data[0])
            setSongData(res.data.data[0])
        })
        .catch(err => console.log(err))

      if (currentSong) {
        axios.get(`https://saavn.me/songs?id=${currentSong}`)
        .then(res => {
          console.log(res.data.data[0].downloadUrl[4].link)
          setPlaySong(res.data.data[0].downloadUrl[4].link)
        })
        .catch(err => console.error(err))
        }
    }, [currentSong])
    
 
  return (
    <div className='w-full h-full p-6 flex flex-col justify-center items-center md:justify-start md:float-left bg-black'>

        {/* Player */}
        {playSong ?
        <div className='flex flex-col justify-center items-center'>
            <div className="flex justify-center items-center pb-8 bg-black transition ease-in duration-700">
            <video id="player" controls>
                <source src={playSong} type="video/mp4" />
                <source src="video/sintel-short.webm" type="video/webm" />
            </video>
            </div>
        </div>
        : <div></div>
        }




        {songData ?
        <div className='flex flex-col justify-center items-center md:justify-start md:float-left m-4'>
            <div className='w-full text-center mb-12'>
                <h5 className='text-base md:text-lg text-[#EA0C5C] mb-1'>Song</h5>
                <h1 className='text-4xl md:text-6xl text-white font-semibold '>{songData.name}</h1>
            </div>
            <div className='flex justify-center items-center'>
                <img className='h-full w-full' src={songData.image[2].link} alt="Album Cover" />
            </div>
            {/* {albumData.primaryArtists.map((artist) => { */}
            <hr />
            <div className='float-left mt-10 text-white'>
                <h4 className='text-xl md:text-4xl text-white text-center'>Primary Artists</h4>
                <h3 className='text-center m-2 bg-[#EA0C50] rounded-xl p-3 text-white'>{songData.primaryArtists}</h3>
            </div>
            {/* })} */}
            <h4 className='text-xl font-semibold text-white'>Lanuguage : {songData.language}</h4>
            {songData.playCount === "" ? <h4 className='text-xl font-semibold text-white'>PlayCount : Not Available</h4> : <h4 className='text-xl font-semibold text-white'>PlayCount : {songData.playCount}</h4> }
            <button type="button" className=" inline-block px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#EA0C5C] hover:shadow-lg focus:bg-[#EA0C5C] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#EA0C5C] active:shadow-lg transition duration-150 ease-in-out my-2 hover:scale-110" onClick={() => setCurrentSong(songData.id)}>Play</button>
        </div>
        : <h1>Loading</h1>
        }
    </div>
  )
}

export default Song;