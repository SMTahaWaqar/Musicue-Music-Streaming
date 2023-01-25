import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import {BsFillHeartFill} from 'react-icons/bs';

const Search = (props) => {

  // const [currentSong, setCurrentSong] = useState("")

  const [likedSong, setLikedSong] = useState();

  const [customPlaylist, setCustomPlaylist] = useState();

  const location = useLocation();

  const [searchData, setSearchData] = useState();

  console.log(location.state)

  const getSearch = (query) => {
    axios.get(`https://saavn.me/search/all?query=${query}`)
    .then(res => {
      console.log(res.data.data);
      setSearchData(res.data.data)
      console.log(searchData.topQuery.results);
    })
    .catch(err => console.log(err))
  }

  const data = localStorage.getItem('user');
  const user = JSON.parse(data).user;


  useEffect(() => {
    getSearch(location.state)

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

    // console.log(currentSong);
    // props.playSong(currentSong);
  }, [likedSong, customPlaylist])
  
  return (
    <div className='h-full bg-black'>
      <div className='md:h-full items-center text-gray-600'>
        <div className='container flex flex-col px-5 py-24 mx-auto'>
          <div className='text-center mb-12'>
            <h1 className='text-4xl md:text-6xl text-[#EA0C5C] font-semibold'>Search Results</h1>
          </div>

          <h4 className="text-xl md:text-lg text-indigo-700 mb-1">Top Results</h4>
          {searchData ?
          <div className='flex flex-wrap items-centerz justify-center md:grid grid-cols-4 gap-4 items-stretch'>
            {searchData.topQuery.results.map((result) => (
              <div className="flex justify-center m-4 w-full h-full z-[1]">
              <div className="rounded-lg shadow-lg bg-gray-700 max-w-sm">
                {result.type === "artist" ? 
                <Link to="/artist" state={result.id} data-mdb-ripple="true" data-mdb-ripple-color="light"><img className="rounded-t-lg" src={result.image[2].link} alt="Song Cover"/></Link> : <Link to={result.type === "song" ? "/song" : "/album"} state={result.id} data-mdb-ripple="true" data-mdb-ripple-color="light">
                <img className="rounded-t-lg" src={result.image[2].link} alt="Song Cover"/>
              </Link>}
                
                <div className="p-6">
                  <h5 className="text-white text-xl font-medium mb-2">{result.title}</h5>
                  <p className="text-white text-base mb-4">
                    {result.type}
                  </p>
                {result.type === 'artist' ? <div className="hidden"></div> : <div className="hidden"></div>}
                {result.type === 'song' ?
                  <div className='flex justify-between flex-col'>
                    <button type="button" className=" inline-block px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#EA0C5C] hover:shadow-lg focus:bg-[#EA0C5C] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#EA0C5C] active:shadow-lg transition duration-150 ease-in-out my-2 hover:scale-110" onClick={() => setCustomPlaylist(result.id)}>Add to Playlist</button>
                    <button type="button" className="px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#EA0C5C] hover:shadow-lg focus:bg-[#EA0C5C] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#EA0C5C] active:shadow-lg transition duration-150 ease-in-out my-2 hover:scale-110 flex items-center justify-center" onClick={() => setLikedSong(result.id)}><BsFillHeartFill /></button>
                  </div> : <div className='hidden'></div> }
                {result.type === 'album' ? 
                  <div className='flex justify-between flex-col'>
                  <Link to="/album" state={result.id} className=" inline-block px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#EA0C5C] hover:shadow-lg focus:bg-[#EA0C5C] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#EA0C5C] active:shadow-lg transition duration-150 ease-in-out my-2 hover:scale-110">
                    Play
                  </Link>
                </div> : <div className='hidden'></div>
                }
                </div>
              </div>
            </div>
            ))}
          </div>
          : <div>Loading</div>
          }

          <h4 className="text-xl md:text-lg text-indigo-700 mt-10">Songs</h4>
          {searchData ?
          <div className='flex flex-wrap items-centerz justify-center md:grid grid-cols-4 gap-4 items-stretch'>
            {searchData.songs.results.map((result) => (
              <div className="flex justify-center m-4 w-full h-full z-[1]">
              <div className="rounded-lg shadow-lg bg-gray-700 max-w-sm">
                <Link to={result.type === "song" ? "/song" : "/album"} state={result.id} data-mdb-ripple="true" data-mdb-ripple-color="light">
                  <img className="rounded-t-lg" src={result.image[2].link} alt="Song Cover"/>
                </Link>
                <div className="p-6">
                  <h5 className="text-white text-xl font-medium mb-2">{result.title}</h5>
                  <p className="text-white text-base mb-4">
                    {result.type}
                  </p>
                  <div className='flex justify-between flex-col'>
                    <button type="button" className=" inline-block px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#EA0C5C] hover:shadow-lg focus:bg-[#EA0C5C] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#EA0C5C] active:shadow-lg transition duration-150 ease-in-out my-2 hover:scale-110" onClick={() => setCustomPlaylist(result.id)}>Add to Playlist</button>
                    <button type="button" className="px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#EA0C5C] hover:shadow-lg focus:bg-[#EA0C5C] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#EA0C5C] active:shadow-lg transition duration-150 ease-in-out my-2 hover:scale-110 flex items-center justify-center" onClick={() => setLikedSong(result.id)}><BsFillHeartFill /></button>
                  </div>
                </div>
              </div>
            </div>
            ))}
          </div>
          : <div>Loading</div>
          }


          <h4 className="text-xl md:text-lg text-indigo-700 mt-10">Albums</h4>
          {searchData ?
          <div className='flex flex-wrap items-centerz justify-center md:grid grid-cols-4 gap-4 items-stretch'>
            {searchData.albums.results.map((result) => (
              <div className="flex justify-center m-4 w-full h-full z-[1]">
              <div className="rounded-lg shadow-lg bg-gray-700 max-w-sm">
                <Link to={result.type === "song" ? "/song" : "/album"} state={result.id} data-mdb-ripple="true" data-mdb-ripple-color="light">
                  <img className="rounded-t-lg" src={result.image[2].link} alt="Song Cover"/>
                </Link>
                <div className="p-6">
                  <h5 className="text-white text-xl font-medium mb-2">{result.title}</h5>
                  <p className="text-white text-base mb-4">
                    {result.type}
                  </p>
                  <div className='flex justify-between flex-col'>
                    <Link to="/album" state={result.id} className=" inline-block px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#EA0C5C] hover:shadow-lg focus:bg-[#EA0C5C] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#EA0C5C] active:shadow-lg transition duration-150 ease-in-out my-2 hover:scale-110">
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

export default Search;