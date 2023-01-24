import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './scenes/login';
import Home from './scenes/home';
import Navbar from './components/navbar';
import { useEffect, useState } from 'react';
import LikedSongs from './scenes/likedSongs';
import CustomPlaylist from './scenes/customPlaylist';
import AboutUs from './scenes/aboutUs';
import Player from './components/player';
import Search from './scenes/search';
import Album from './scenes/album';
import Song from './scenes/song';

function App() {

  const [loginToken, setLoginToken] = useState();
  
  const [currentLink, setCurrentLink] = useState();

  // const [searchHome, setSearchHome] = useState();

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const sendData = (data) => {
    setLoginToken(data.token);
    console.log(data);
    if (data.token) {
      localStorage.setItem('loggedIn', true);
      localStorage.setItem('user', JSON.stringify(data));
    }
    else {
      localStorage.setItem('loggedIn', false);
    }
  }

  const playSong = (data) => {
    // setCurrentLink(data.link)
    // console.log(data)
    if (data){
      setCurrentLink(data)
    }
  }

  useEffect(() =>{
    console.log(currentLink);
  },[currentLink])

  // const searchData = (data) => {
  //   setSearchHome(data);
  // }



  return (!localStorage.getItem('loggedIn') ?
      <Login sendData={sendData}/> :
      <Router>
        <Navbar />
        {/* <Player song={currentLink}/> */}
        <Routes>
          <Route exact path="/" element={<Home />} /> 
          <Route exact path="/likedSongs" element={<LikedSongs playSong={playSong}/>} /> 
          <Route exact path="/customPlaylist" element={<CustomPlaylist />} /> 
          <Route exact path="/aboutUs" element={<AboutUs />} /> 
          <Route exact path="/search" element={<Search />} /> 
          <Route exact path="/album" element={<Album />} /> 
          <Route exact path="/song" element={<Song />} /> 
        </Routes>
    </Router>
  );
}

export default App;
