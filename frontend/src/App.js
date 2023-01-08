import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './scenes/login';
import Home from './scenes/home/home';
import Navbar from './components/navbar';
import { useState } from 'react';

function App() {

  const [loginToken, setLoginToken] = useState();

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const sendData = (data) => {
    setLoginToken(data);
    if (loginToken) {
      localStorage.setItem('loggedIn', true);
    }
    else {
      localStorage.setItem('loggedIn', true);
    }
  }



  return (!localStorage.getItem('loggedIn') ?
      <Login sendData={sendData}/> :
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} /> 
        </Routes>
    </Router>
  );
}

export default App;
