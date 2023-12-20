import {Button, AppBar, Toolbar, IconButton, Menu, MenuItem, Typography,} from '@mui/material'
import { NavLink as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu'
import React, {useState} from 'react';
// import { deepOrange, deepPurple } from '@mui/material/colors';

function NavBar({ user, setUser }) {
  const [anchorEl, setAnchorEl] = useState(null);

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
        <Menu
          id="nav-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem component={RouterLink} to="/home" onClick={handleMenuClose}>
            Home
          </MenuItem>
          <MenuItem
            component={RouterLink}
            to="/clubs"
            onClick={handleMenuClose}
          >
            BookClubs
          </MenuItem>
          {!user ? (
            <>
              <MenuItem
                component={RouterLink}
                to="/login"
                onClick={handleMenuClose}
              >
                Login
              </MenuItem>
              <MenuItem
                component={RouterLink}
                to="/signup"
                onClick={handleMenuClose}
              >
                Sign Up
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem
                component={RouterLink}
                to="/users"
                onClick={handleMenuClose}
              >
                Users
              </MenuItem>
              <MenuItem
                component={RouterLink}
                to="/books"
                onClick={handleMenuClose}
              >
                Books
              </MenuItem>
              <MenuItem
                component={RouterLink}
                to="/mybookclub"
                onClick={handleMenuClose}
              >
                My Book Club
              </MenuItem>
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

    //     fetch('/logout', {
    //       method: 'DELETE'
    //     }).then((resp) => {
    //       if (resp.ok) {
    //         setUser(null)
    //       }
    //     })
    //   }



      
    //   return (
    //     <div>
    //       <Button>
    //         <NavLink to="/home" className="nav-link" >
    //           Home
    //         </NavLink>
    //       </Button>
    //       <Button>
    //         <NavLink to="/clubs" className="nav-link">
    //           BookClubs
    //         </NavLink>
    //       </Button>
    //       {!user ? (
    //         <>
    //           <Button>
    //             <NavLink to="/login" className="nav-link">
    //               Login
    //             </NavLink>
    //           </Button>
    //           <Button>
    //             <NavLink to="/signup" className="nav-link">
    //               Sign Up
    //             </NavLink>
    //           </Button>
    //         </>
    //       ) : (
    //         <>
    //           <Button>
    //             <NavLink to="/users" className="nav-link">
    //               Users
    //             </NavLink>
    //           </Button>
    //           <Button>
    //             <NavLink to="/books" className="nav-link">
    //               Books
    //             </NavLink>
    //           </Button>
              
    //           <Button>
    //             <NavLink to="/mybookclub" className="nav-link">
    //               My Book Club
    //             </NavLink>
    //           </Button>
    //           <Button onClick={handleLogout} style={{fontFamily: 'PT Serif', color: '#371A37', backgroundColor: '#CEC9A7', fontWeight: 'bold'}}>Logout</Button>
    //         </>
    //       )}
    //     </div>
    //   );
    // };
