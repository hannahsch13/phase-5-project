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
            color: '#371A37'
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
          <MenuItem component={RouterLink} to="/home" onClick={handleMenuClose}>
          <Typography
                  style={{
                    fontFamily: 'PT Serif',
                    color: '#A86538',
                    fontWeight: 'bold',
                  }}
                >
                  Home
                </Typography>
          </MenuItem>
          <MenuItem
            component={RouterLink}
            to="/clubs"
            onClick={handleMenuClose}
          >
                <Typography
                  style={{
                    fontFamily: 'PT Serif',
                    color: '#A86538',
                    fontWeight: 'bold',
                  }}
                >
                  Book Clubs
                </Typography>
          </MenuItem>
                    <MenuItem
                      component={RouterLink}
                      to="/books"
                      onClick={handleMenuClose}
                    >
                      <Typography
                        style={{
                          fontFamily: 'PT Serif',
                          color: '#A86538',
                          fontWeight: 'bold',
                        }}
                      >
                        Books
                      </Typography>
                    </MenuItem>
          {!user ? (
            <>
              <MenuItem
                component={RouterLink}
                to="/login"
                onClick={handleMenuClose}
              >
                <Typography
                  style={{
                    fontFamily: 'PT Serif',
                    color: '#371A37',
                    fontWeight: 'bold',
                  }}
                >
                  Login
                </Typography>
              </MenuItem>
              <MenuItem
                component={RouterLink}
                to="/signup"
                onClick={handleMenuClose}
              >
                <Typography
                  style={{
                    fontFamily: 'PT Serif',
                    color: '#371A37',
                    fontWeight: 'bold',
                  }}
                >
                  Signup
                </Typography>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem
                component={RouterLink}
                to="/users"
                onClick={handleMenuClose}
              >
                <Typography
                  style={{
                    fontFamily: 'PT Serif',
                    color: '#A86538',
                    fontWeight: 'bold',
                  }}
                >
                  Users
                </Typography>
              </MenuItem>
              <MenuItem
                component={RouterLink}
                to="/mybookclub"
                onClick={handleMenuClose}
              >
                <Typography
                  style={{
                    fontFamily: 'PT Serif',
                    color: '#A86538',
                    fontWeight: 'bold',
                  }}
                >
                  My Book Club
                </Typography>
              </MenuItem>
              {/* <MenuItem
                component={RouterLink}
                to="/profile"
                onClick={handleMenuClose}
              >
                <Typography
                  style={{
                    fontFamily: 'PT Serif',
                    color: '#A86538',
                    fontWeight: 'bold',
                  }}
                >
                  My Profile
                </Typography>
              </MenuItem> */}
              <MenuItem onClick={handleLogout}>
                <Typography
                  style={{
                    fontFamily: 'PT Serif',
                    color: '#371A37',
                    fontWeight: 'bold',
                  }}
                >
                  Logout
                </Typography>
              </MenuItem>
            </>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;

  