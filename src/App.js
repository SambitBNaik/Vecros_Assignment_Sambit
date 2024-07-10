import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Components/Redux/store';
import { lightTheme, darkTheme } from './Components/Theme/Theme';
import Navbar from './Components/Navbar/Navbar';
import Travel from './Components/Pages/Travel';
import LifeStyle from './Components/Pages/LifeStyle';
import Food from './Components/Pages/Food';
import Technology from './Components/Pages/Technology';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = createTheme(isDarkMode ? darkTheme : lightTheme);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className="App">
            <Navbar toggleTheme={toggleTheme} />
            <Routes>
              <Route path='/' element={<Travel/>}/>
              <Route path="/travel" element={<Travel />} />
              <Route path="/lifeStyle" element={<LifeStyle />} />
              <Route path="/food" element={<Food />} />
              <Route path="/technology" element={<Technology />} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;

