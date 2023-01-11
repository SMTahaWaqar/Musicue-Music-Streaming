import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './scenes/login';
import Home from './scenes/home/home';
import Navbar from './components/navbar';
import { useState } from 'react';
// import Search from './scenes/search';
import LikedSongs from './scenes/likedSongs';

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
        <Routes>
          <Route exact path="/" element={<Home />} /> 
          <Route exact path="/likedSongs" element={<LikedSongs />} /> 
          {/* <Route path="/search" element={<Search sendData={searchData}/>} /> */}
        </Routes>
    </Router>
  );
}

export default App;
