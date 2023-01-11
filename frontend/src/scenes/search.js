import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

const Search = () => {

  const location = useLocation();

  const [searchData, setSearchData] = useState();

  console.log(location.state)

  const getSearch = (query) => {
    axios.get(`https://saavn.me/search/all?query=${query}`)
    .then(res => {
      console.log(res.data.data);
    })
    .catch(err => console.log(err))
  }


  useEffect(() => {
    getSearch(location.state)
  }, [])
  
  return (
    <div className='h-full bg-gray-100'>
      <div className='md:h-full items-center text-gray-600'>
        <div className='container flex flex-col px-5 py-24 mx-auto'>
          <div className='text-center mb-12'>
            <h1 className='text-4xl md:text-6xl text-gray-700 font-semibold'>Search Results</h1>
          </div>

          <h4 className="text-xl md:text-lg text-indigo-700 mb-1">Top Results</h4>
          {searchData ?
          <div className='flex flex-wrap items-centerz justify-center md:grid grid-cols-4 gap-4 items-stretch'>
            {searchData.topQuery.results.map((result) => (
              <div className="flex justify-center m-4 w-full h-full z-[1]">
              <div className="rounded-lg shadow-lg bg-white max-w-sm">
                <Link to={result.type === "song" ? "/song" : "/album"} state={result.title} data-mdb-ripple="true" data-mdb-ripple-color="light">
                  <img className="rounded-t-lg" src={result.image[2].link} alt="Song Cover"/>
                </Link>
                <div className="p-6">
                  <h5 className="text-gray-900 text-xl font-medium mb-2">{result.title}</h5>
                  <p className="text-gray-700 text-base mb-4">
                    {result.type}
                  </p>
                  {/* <div className='flex justify-between flex-col'>
                    <button type="button" className=" inline-block px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#EA0C5C] hover:shadow-lg focus:bg-[#EA0C5C] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#EA0C5C] active:shadow-lg transition duration-150 ease-in-out my-2 hover:scale-110">Play</button>
                    <button type="button" className=" inline-block px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#EA0C5C] hover:shadow-lg focus:bg-[#EA0C5C] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#EA0C5C] active:shadow-lg transition duration-150 ease-in-out my-2 hover:scale-110">Add to Playlist</button>
                    <button type="button" className=" inline-block px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#EA0C5C] hover:shadow-lg focus:bg-[#EA0C5C] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#EA0C5C] active:shadow-lg transition duration-150 ease-in-out my-2 hover:scale-110 flex items-center justify-center"><BsFillHeartFill /></button>
                  </div> */}
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