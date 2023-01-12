import React, { useEffect, useState } from 'react'
import './home.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import {BsFillHeartFill} from 'react-icons/bs';
import './home.css';

const Home = () => {

  const [currentSong, setCurrentSong] = useState();

  const [isPlaying, setIsPlaying] = useState("");

  const [homeData, setHomData] = useState();

  const getSong = async (name) => {
    axios.get(`https://saavn.me/search/songs?query=${name}`)
    .then(res => {
        console.log(res.data.data.results);
        let result = res.data.data.results;
        // res.data.data.results.map((song) => {
        //   console.log(song)
        //   if (song.name === currentSong) {
        //     console.log(song.downloadUrl[4].link);
        //     setIsPlaying(song.downloadUrl[4].link)
        //   }
        //   else {
        //     console.log(1)
        //     setIsPlaying("");
        //   }
        // })
        for (var i=0; i<result.length; i++) {
          if (result[i].name === currentSong) {
            console.log(typeof(result[i].downloadUrl[4].link));
            setIsPlaying(result[i].downloadUrl[4].link);
          }
        }
      }).catch(err => console.log(err))
  }

  useEffect(() => {
    axios.get('https://saavn.me/modules?language=hindi')
    .then(res => {
        console.log(res.data.data.trending.songs[0].name)
        setHomData(res.data.data.trending);
        setCurrentSong(res.data.data.trending.songs[5].name)
      }).catch(err => console.log(err))

      if (currentSong !== "") {
        getSong(currentSong)
        // document.getElementById("player").load();
        console.log(isPlaying)
      }
  }, [currentSong])
  

  return (
    <div className='h-full bg-black'>
      <div className='md:h-full items-center text-gray-600'>
        <div className='container flex flex-col px-5 py-24 mx-auto'>
          <div className='text-center mb-12'>
            <h5 className='text-base md:text-lg text-[#EA0C5C] mb-1'>Trending For the day</h5>
            <h1 className='text-4xl md:text-6xl text-white font-semibold'>Top Charts</h1>
          </div>

          <h4 className="text-xl md:text-lg text-[#EA0C5C] mb-1">Trending Songs</h4>
          {homeData ?
          <div className='flex flex-wrap items-centerz justify-center md:grid grid-cols-4 gap-4 items-stretch'>
            {homeData.songs.map((song) => (
              <div className="flex justify-center m-4 w-full h-full z-[1]">
              <div className="rounded-lg shadow-lg bg-gray-700 max-w-sm">
                <Link to="/song" state={song.name} data-mdb-ripple="true" data-mdb-ripple-color="light">
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
                    <button type="button" className=" inline-block px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#EA0C5C] hover:shadow-lg focus:bg-[#EA0C5C] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#EA0C5C] active:shadow-lg transition duration-150 ease-in-out my-2 hover:scale-110 flex items-center justify-center"><BsFillHeartFill /></button>
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
                  <Link to="/album" state={album.name} data-mdb-ripple="true" data-mdb-ripple-color="light">
                    <img className="rounded-t-lg" src={album.image[2].link} alt="Song Cover"/>
                  </Link>
                  <div className="p-6">
                    <h5 className="text-white text-xl font-medium mb-2">{album.name}</h5>
                    <p className="text-white text-base mb-4">
                      {album.artists[0].name}
                    </p>
                    <div className='flex justify-between flex-col'>
                      <button type="button" className=" inline-block px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#EA0C5C] hover:shadow-lg focus:bg-[#EA0C5C] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#EA0C5C] active:shadow-lg transition duration-150 ease-in-out my-2 hover:scale-110">Play</button>
                      <button type="button" className=" inline-block px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#EA0C5C] hover:shadow-lg focus:bg-[#EA0C5C] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#EA0C5C] active:shadow-lg transition duration-150 ease-in-out my-2 hover:scale-110">Add to Playlist</button>
                      <button type="button" className=" inline-block px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#EA0C5C] hover:shadow-lg focus:bg-[#EA0C5C] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#EA0C5C] active:shadow-lg transition duration-150 ease-in-out my-2 hover:scale-110">Liked Songs</button>
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




