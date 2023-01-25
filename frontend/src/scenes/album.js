import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BsFillHeartFill } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';

const Album = () => {

    const location = useLocation();

    const [currentSong, setCurrentSong] = useState();

    const [playSong, setPlaySong] = useState();


    const [albumData, setAlbumData] = useState();

    const [likedSong, setLikedSong] = useState();

    const [customPlaylist, setCustomPlaylist] = useState();

    const data = localStorage.getItem('user');
    const user = JSON.parse(data).user;  

    const getAlbum = (album) => {
        console.log(album);
        axios.get(`https://saavn.me/albums?id=${album}`)
        .then(res => {
            console.log(res.data.data)
            setAlbumData(res.data.data)
        })
        .catch(err => console.log(err))
    }

    const handleClear = () => {
        window.location.reload()
      }

    useEffect(() => {
      getAlbum(location.state);

      if (currentSong) {
        axios.get(`https://saavn.me/songs?id=${currentSong}`)
        .then(res => {
          console.log(res.data.data[0].downloadUrl[4].link)
          setPlaySong(res.data.data[0].downloadUrl[4].link)
        })
        .catch(err => console.error(err))
        }

      if (likedSong) {
        const songId = likedSong
        const userId = user._id;
        const values = {songId, userId}  
        console.log(values);
        axios.post('http://localhost:3001/user/likesong', values)
        .then(response => console.log(response))
        .catch(err => console.log(err))
  
        setLikedSong(false);
      }

      if (customPlaylist) {
        const songId = customPlaylist
        const userId = user._id;
        const values = {songId, userId}  
        console.log(values);
        axios.post('http://localhost:3001/user/addtoplaylist', values)
        .then(response => console.log(response))
        .catch(err => console.log(err))
        setCustomPlaylist(false);
      }

    }, [likedSong, customPlaylist, currentSong])
    
 
  return (
    <div className='w-full h-[full] p-6 flex flex-col justify-center items-center md:justify-start md:float-left bg-black'>

        {/* Player */}
        {playSong ?
        <div className='flex flex-col justify-center items-center'>
            <div className="flex justify-center items-center pb-8 bg-black transition ease-in duration-700">
            <video id="player" controls>
                <source src={playSong} type="video/mp4" />
                <source src="video/sintel-short.webm" type="video/webm" />
            </video>
            </div>
            <div>
                <button className='inline-block px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#EA0C5C] hover:shadow-lg focus:bg-[#EA0C5C] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#EA0C5C] active:shadow-lg transition duration-150 ease-in-out my-2 hover:scale-110' onClick={handleClear}>clear</button>
            </div>
        </div>
        : <div></div>
        }



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
                <button type="button" className=" inline-block px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#EA0C5C] hover:shadow-lg focus:bg-[#EA0C5C] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#EA0C5C] active:shadow-lg transition duration-150 ease-in-out my-2 hover:scale-110" onClick={() => setCurrentSong(song.id)}>Play</button>
                <button type="button" className=" inline-block px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#EA0C5C] hover:shadow-lg focus:bg-[#EA0C5C] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#EA0C5C] active:shadow-lg transition duration-150 ease-in-out my-2 hover:scale-110" onClick={() => setCustomPlaylist(song.id)}>Add to Playlist</button>
                <button type="button" className="px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#EA0C5C] hover:shadow-lg focus:bg-[#EA0C5C] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#EA0C5C] active:shadow-lg transition duration-150 ease-in-out my-2 hover:scale-110 flex items-center justify-center" onClick={() => setLikedSong(song.id)}><BsFillHeartFill/></button>
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