import React from 'react';
import {Link} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { TextField } from '@mui/material';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen= useMediaQuery(theme.breakpoints.down('sm'));

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{backgroundColor:"#546e7a"}}>
      <Container>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{flexGrow: isMobile ? 1 : 0}}>
            MY BLOG
          </Typography>
          <div style={{ flexGrow: 1}} />
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem component={Link} to="/travel" onClick={handleMenuClose}>Travel</MenuItem>
                <MenuItem component={Link} to="/lifeStyle" onClick={handleMenuClose}>LifeStyle</MenuItem>
                <MenuItem component={Link} to="/food" onClick={handleMenuClose}>Food</MenuItem>
                <MenuItem component={Link} to="/technology" onClick={handleMenuClose}>Technology</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/travel">Travel</Button>
              <Button color="inherit" component={Link} to="/lifeStyle">LifeStyle</Button>
              <Button color="inherit" component={Link} to="/food">Food</Button>
              <Button color="inherit" component={Link} to="/technology">Technology</Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
