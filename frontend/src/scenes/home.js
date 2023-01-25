import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import {BsFillHeartFill} from 'react-icons/bs';

const Home = () => {

  const [currentSong, setCurrentSong] = useState();

  const [playSong, setPlaySong] = useState();

  const [homeData, setHomData] = useState();

  const [likedSong, setLikedSong] = useState();
  
  const [customPlaylist, setCustomPlaylist] = useState();

  const data = localStorage.getItem('user');
  const user = JSON.parse(data).user;

  const handleClear = () => {
    window.location.reload()
  }

  useEffect(() => {
    axios.get('https://saavn.me/modules?language=hindi')
    .then(res => {
        console.log(res.data.data.trending.songs[0].name)
        setHomData(res.data.data.trending);
        console.log(homeData.songs);
      }).catch(err => console.log(err))

      // console.log(likedSong)

      console.log(currentSong)

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

  }, [likedSong, currentSong, customPlaylist])
  

  return (
    <div className='h-full bg-black'>


        <h2 className='pt-8 text-center text-2xl md:text-4xl text-white font-semibold'>Hi! Welcome Back {user.username}</h2>
      
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
            <h5 className='text-base md:text-lg text-[#EA0C5C] mb-1'>Trending For the day</h5>
            <h1 className='text-4xl md:text-6xl text-white font-semibold'>Top Charts</h1>
          </div>

          <h4 className="text-xl md:text-lg text-[#EA0C5C] mb-1">Trending Songs</h4>
          {homeData ?
          <div className='flex flex-wrap justify-center md:grid grid-cols-4 gap-4 items-stretch'>
            {homeData.songs.map((song) => (
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
          : <div>Loading</div>
          }

          <h4 className="text-xl md:text-lg text-[#EA0C5C] mt-20">Trending Albums</h4>
            {homeData ?
            <div className='flex flex-wrap items-centerz justify-center md:grid grid-cols-4 gap-4 items-stretch'>
              {homeData.albums.map((album) => (
                <div className="flex justify-center m-4 w-full h-full z-[1]">
                <div className="rounded-lg shadow-lg bg-gray-700 max-w-sm">
                  <Link to="/album" state={album.id} data-mdb-ripple="true" data-mdb-ripple-color="light">
                    <img className="rounded-t-lg" src={album.image[2].link} alt="Song Cover"/>
                  </Link>
                  <div className="p-6">
                    <h5 className="text-white text-xl font-medium mb-2 ">{album.name}</h5>
                    <p className="text-white text-base mb-4">
                      {album.artists[0].name}
                    </p>
                    <div className='flex justify-between flex-col'>
                      <Link to="/album" state={album.id} className=" inline-block px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#EA0C5C] hover:shadow-lg focus:bg-[#EA0C5C] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#EA0C5C] active:shadow-lg transition duration-150 ease-in-out my-2 hover:scale-110">
                        Play
                      </Link>
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
    </div>
  )
}
        

export default Home;




