import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './scenes/login';
import Home from './scenes/home/home';
import Navbar from './components/navbar';
import { useState } from 'react';
import LikedSongs from './scenes/likedSongs';
import CustomPlaylist from './scenes/customPlaylist';
import AboutUs from './scenes/aboutUs';
import Player from './components/player';
import Search from './scenes/search';
import Album from './scenes/album';

function App() {

  const [loginToken, setLoginToken] = useState();

  // const [searchHome, setSearchHome] = useState();

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const sendData = (data) => {
    setLoginToken(data);
    if (loginToken) {
      localStorage.setItem('loggedIn', true);
    }
    else {
      localStorage.setItem('loggedIn', false);
    }
  }

  // const searchData = (data) => {
  //   setSearchHome(data);
  // }



  return (!localStorage.getItem('loggedIn') ?
      <Login sendData={sendData}/> :
      <Router>
        <Navbar />
        <Player />
        <Routes>
          <Route exact path="/" element={<Home />} /> 
          <Route exact path="/likedSongs" element={<LikedSongs />} /> 
          <Route exact path="/customPlaylist" element={<CustomPlaylist />} /> 
          <Route exact path="/aboutUs" element={<AboutUs />} /> 
          <Route exact path="/search" element={<Search />} /> 
          <Route exact path="/album" element={<Album />} /> 
        </Routes>
    </Router>
  );
}

export default App;
