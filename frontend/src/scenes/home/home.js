import React, { useEffect, useState } from 'react'
import './home.css'
import axios from 'axios';

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
    axios.get('https://saavn.me/modules?language=english,hindi')
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
    <div className='h-full bg-gray-100'>
      <div className='md:h-full items-center text-gray-600'>
        <div className='container flex flex-col px-5 py-24 mx-auto'>
          <div className='text-center mb-12'>
            <h5 className='text-base md:text-lg text-indigo-700 mb-1'>Trending For the day</h5>
            <h1 className='text-4xl md:text-6xl text-gray-700 font-semibold'>Top Charts</h1>
          </div>

          <h4 className="text-xl md:text-lg text-indigo-700 mb-1">Trending Songs</h4>
          {homeData ?
          <div className='flex flex-wrap items-centerz justify-center md:grid grid-cols-4 gap-4 items-stretch'>
            {homeData.songs.map((song) => (
              <div class="flex justify-center m-4 w-full h-full z-[1]">
              <div class="rounded-lg shadow-lg bg-white max-w-sm">
                <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
                  <img class="rounded-t-lg" src={song.image[2].link} alt="Song Cover"/>
                </a>
                <div class="p-6">
                  <h5 class="text-gray-900 text-xl font-medium mb-2">{song.name}</h5>
                  <p class="text-gray-700 text-base mb-4">
                    {song.primaryArtists[0].name}
                  </p>
                  <button type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Button</button>
                </div>
              </div>
            </div>
            ))}
          </div>
          : <div>Loading</div>
          }

          <h4 className="text-xl md:text-lg text-indigo-700 mt-20">Trending Albums</h4>
            {homeData ?
            <div className='flex flex-wrap items-centerz justify-center md:grid grid-cols-4 gap-4 items-stretch'>
              {homeData.albums.map((album) => (
                <div class="flex justify-center m-4 w-full h-full z-[1]">
                <div class="rounded-lg shadow-lg bg-white max-w-sm">
                  <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
                    <img class="rounded-t-lg" src={album.image[2].link} alt="Song Cover"/>
                  </a>
                  <div class="p-6">
                    <h5 class="text-gray-900 text-xl font-medium mb-2">{album.name}</h5>
                    <p class="text-gray-700 text-base mb-4">
                      {album.artists[0].name}
                    </p>
                    <button type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Button</button>
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

  {/* <div>
            Playing {currentSong}
            <span>{isPlaying}</span>
            {isPlaying ? */}
            {/* <div className="player"> */}
              {/* {isPlaying} */}
              {/* <video id="player" controls>
                <source src={isPlaying} type="video/mp4" />
                <source src="video/sintel-short.webm" type="video/webm" /> */}
                {/* <!-- fallback content here --> */}
              {/* </video> */}
              {/* <div className="controls">
                <button className="play" data-icon="P" aria-label="play pause toggle"></button>
                <button className="stop" data-icon="S" aria-label="stop"></button>
                <div className="timer">
                  <div></div>
                  <span aria-label="timer">00:00</span>
                </div>
                <button className="rwd" data-icon="B" aria-label="rewind"></button>
                <button className="fwd" data-icon="F" aria-label="fast forward"></button>
              </div>
            </div> */}
            {/* : <div>Loading</div> */}
            {/* } */}
          {/* </div> */}
        

export default Home;




