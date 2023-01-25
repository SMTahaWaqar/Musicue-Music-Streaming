import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BsFillHeartFill } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';

const Artist = () => {
    
    const location = useLocation();

    const [artistData, setArtistData] = useState();

    const [artistSongs, setArtistSongs] = useState();

    const [likedSong, setLikedSong] = useState();

    const [customPlaylist, setCustomPlaylist] = useState();

    const data = localStorage.getItem('user');
    const user = JSON.parse(data).user;
  

    // console.log(location.state);

    useEffect(() => {
          axios.get(`https://saavn.me/artists?id=${location.state}`)
            .then(res => {
                console.log(res.data.data)
                setArtistData(res.data.data)
            })
            .catch(err => console.log(err))

            axios.get(`https://saavn.me/artists/${location.state}/songs?page=1`)
            .then(res => {
                console.log(res.data.data.results)
                setArtistSongs(res.data.data.results)
            })
            .catch(err => console.log(err))

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

        }, [likedSong, customPlaylist])
        


  return (
    <>
    <div className='w-full h-full p-6 flex flex-col justify-center items-center md:justify-start md:float-left bg-black'>

        {artistData ?
        <div className='flex flex-col justify-center items-center md:justify-start md:float-left m-4'>
            <div className='w-full text-center mb-12'>
                <h5 className='text-base md:text-lg text-[#EA0C5C] mb-1'>Artist</h5>
                <h1 className='text-4xl md:text-6xl text-white font-semibold '>{artistData.name}</h1>
            </div>
            <div className='flex justify-center items-center'>
                <img className='h-full w-full' src={artistData.image[2].link} alt="Album Cover" />
            </div>
            <hr />
            <div className='float-left mt-10 text-white'>
                <h4 className='text-xl md:text-4xl text-white text-center'>Language</h4>
                <h3 className='text-center m-2 bg-[#EA0C50] rounded-xl p-3 text-white capitalize'>{artistData.dominantLanguage}</h3>
                <h4 className='text-xl mt-4 md:text-4xl text-white text-center'>Followers</h4>
                <h3 className='text-center m-2 bg-[#EA0C50] rounded-xl p-3 text-white'>{artistData.followerCount}</h3>
            </div>
            {/* })} */}
            {/* <h4 className='text-xl font-semibold text-white'>Lanuguage : {songData.language}</h4> */}
            {/* {songData.playCount === "" ? <h4 className='text-xl font-semibold text-white'>PlayCount : Not Available</h4> : <h4 className='text-xl font-semibold text-white'>PlayCount : {songData.playCount}</h4> } */}
        </div>
        : <h1>Loading</h1>
        }
    

    {artistSongs ?
    <div className='flex flex-wrap justify-center md:grid grid-cols-4 gap-4 items-stretch'>
        {artistSongs.map((song) => (
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
                <button type="button" className=" inline-block px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#EA0C5C] hover:shadow-lg focus:bg-[#EA0C5C] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#EA0C5C] active:shadow-lg transition duration-150 ease-in-out my-2 hover:scale-110" onClick={() => setCustomPlaylist(song.id)}>Add to Playlist</button>
                <button type="button" className="px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#EA0C5C] hover:shadow-lg focus:bg-[#EA0C5C] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#EA0C5C] active:shadow-lg transition duration-150 ease-in-out my-2 hover:scale-110 flex items-center justify-center" onClick={() => setLikedSong(song.id)}><BsFillHeartFill/></button>
                </div>
            </div>
            </div>
        </div>
        ))}
        </div>
        : <div>Loading</div>}
        </div>



    </>
  )
}

export default Artist;
