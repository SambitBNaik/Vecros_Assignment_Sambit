import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Travel from './Components/Pages/Travel';
import LifeStyle from './Components/Pages/LifeStyle';
import Food from './Components/Pages/Food';
import Technology from './Components/Pages/Technology';
import { Provider } from 'react-redux';
import { store } from './Components/Redux/store';


function App() {
  return (
    <Provider store={store}>
    <Router>
    <div className='App'>
          <Navbar/>
          <Routes> 
              <Route path="/travel" element={<Travel/>}></Route>
              <Route path="/lifeStyle" element={<LifeStyle/>}></Route>
              <Route path="/food" element={<Food/>}></Route>
              <Route path="/technology" element={<Technology/>}></Route>
          </Routes>
    </div>
    </Router>
    </Provider>
  );
}

export default App;
