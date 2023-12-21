import {Button, AppBar, Toolbar, IconButton, Menu, MenuItem, Typography,} from '@mui/material'
import { NavLink as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu'
import React, {useState} from 'react';

function NavBar({ user, setUser }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    fetch('/logout', {
      method: 'DELETE',
    }).then((resp) => {
      if (resp.ok) {
        setUser(null);
      }
    });
    handleMenuClose();
    navigate('/home')
  };
  const menuItemStyle = {
    fontFamily: 'PT Serif',
    fontWeight: 'bold',
  };

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h4"
          component="div"
          sx={{
            flexGrow: 1,
            textAlign: '',
            fontFamily: 'UnifrakturCook',
            color: '#371A37',
          }}
        >
          StorySync
        </Typography>

        <Menu
          id="nav-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {[
            <MenuItem key="home" component={RouterLink} to="/home" onClick={handleMenuClose} style={menuItemStyle}>
              Home
            </MenuItem>,
            <MenuItem key="clubs" component={RouterLink} to="/clubs" onClick={handleMenuClose} style={menuItemStyle}>
              Book Clubs
            </MenuItem>,
            <MenuItem key="books" component={RouterLink} to="/books" onClick={handleMenuClose} style={menuItemStyle}>
              Books
            </MenuItem>,
          ]}
          {!user ? (
            [
              <MenuItem key="login" component={RouterLink} to="/login" onClick={handleMenuClose} style={menuItemStyle}>
                Login
              </MenuItem>,
              <MenuItem key="signup" component={RouterLink} to="/signup" onClick={handleMenuClose} style={menuItemStyle}>
                Signup
              </MenuItem>,
            ]
          ) : (
            [
              <MenuItem key="users" component={RouterLink} to="/users" onClick={handleMenuClose} style={menuItemStyle}>
                Users
              </MenuItem>,
              <MenuItem key="mybookclub" component={RouterLink} to="/mybookclub" onClick={handleMenuClose} style={menuItemStyle}>
                My Book Club
              </MenuItem>,
              <MenuItem key="profile" component={RouterLink} to="/profile" onClick={handleMenuClose} style={menuItemStyle}>
                My Profile
              </MenuItem>,
              <MenuItem key="logout" onClick={handleLogout} style={menuItemStyle}>
                Logout
              </MenuItem>,
            ]
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
export default NavBar;