import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const Search = () => {

  const location = useLocation();

  const [searchData, setSearchData] = useState();


  useEffect(() => {
    // axios.get(`https://saavn.me/search/songs?query=${location.state}`)
    // .then(response => {
    //   console.log(response);
    //   setSearchData(response.data.data.results)
    //   })
    // .catch(error => console.error(error))
    try {
      
    setSearchData(location.state)
    console.log(location.state) 
    } catch (error) {
      console.log(error);
    }
  }, [])
  
  return (
    // <div>{searchData ? <p>{searchData[0].name}</p> : <p>Loading</p>}</div>
    <div>{searchData}</div>
  )
}

export default Search;