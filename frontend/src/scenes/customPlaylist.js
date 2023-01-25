import React, { useEffect, useState } from 'react'
import { likedSongs } from '../data'
import { BsFillHeartFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import axios from 'axios';

const LikedSongs = () => {

    const [currentSong, setCurrentSong] = useState();

    const [playSong, setPlaySong] = useState();

    const [likedSong, setLikedSong] = useState();


    const [songData, setSongData] = useState([]);

    const getSongData = (songId) => {
        axios.get(`https://saavn.me/songs?id=${songId}`)
        .then(response => {
            console.log(response.data.data[0]);
            setSongData(songData =>  songData.concat(response.data.data[0]))
            console.log(songData)
        })
        .catch(error => console.log(error))
    }

    const handleClear = () => {
        window.location.reload()
    }

    useEffect(() => {    
        const data = localStorage.getItem('user');
        const user = JSON.parse(data).user;
        var obj = {};
        obj.userId = user._id
        console.log(obj);
        axios.post("http://localhost:3001/user/getCustomPlaylist", obj)
        .then(res => {
            console.log(res.data)
            res.data.map((song) => {
                getSongData(song)
            })
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
    }, [currentSong, likedSong])


  return (
    <div className='h-full bg-black'>

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


        <div className='md:h-full items-center text-gray-600'>
            <div className='container flex flex-col px-5 py-24 mx-auto'>
                <div className='text-center mb-12'>
                    <h5 className='text-base md:text-lg text-[#EA0C50] mb-1'>Your Own Playlist</h5>
                    <h1 className='text-4xl md:text-6xl text-white font-semibold'>Custom Playlist</h1>
                </div>
            </div>

            {songData.length>0 ?
                <div className='flex flex-wrap p-6 items-centerz justify-center md:grid grid-cols-4 gap-4 items-stretch'>
                    {songData.map((song) => (
                    <div class="flex justify-center m-4 w-[80%] h-full z-[1]">
                    <div class="rounded-lg shadow-lg bg-gray-700 max-w-sm">
                        <Link to="/song" state={song.id} data-mdb-ripple="true" data-mdb-ripple-color="light">
                            <img className="rounded-t-lg" src={song.image[2].link} alt="Song Cover"/>
                        </Link>
                        <div class="p-6">
                        <h5 class="text-white text-xl font-medium mb-2">{song.name}</h5>
                        <p class="text-white text-base mb-4">
                            {song.primaryArtists}
                        </p>
                        <div className='flex flex-col'>
                          <button type="button" className="inline-block px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#EA0C5C] hover:shadow-lg focus:bg-[#EA0C5C] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#EA0C5C] active:shadow-lg transition duration-150 ease-in-out my-2 hover:scale-110" onClick={() => setCurrentSong(song.id)}>Play</button>
                          <button type="button" className="px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#EA0C5C] hover:shadow-lg focus:bg-[#EA0C5C] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#EA0C5C] active:shadow-lg transition duration-150 ease-in-out my-2 hover:scale-110 flex items-center justify-center" onClick={() => setLikedSong(song.id)}><BsFillHeartFill /></button>
                        </div>
                        </div>
                    </div>
                    </div>
                    ))}
                </div>
                : <div className='h-[40vh] text-center text-white text-4xl'>Empty</div>
            }

        </div>
    </div>
  )
}

export default LikedSongs