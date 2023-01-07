import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './scenes/login';
import Home from './scenes/home';
import Navbar from './components/navbar';

function App() {


  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
