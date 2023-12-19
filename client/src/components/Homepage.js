import React from 'react';
import { Typography, Button, Container, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { useContext} from 'react'

import { UserContext } from './App';

function Homepage(){ 
    const {user} = useContext(UserContext)

    return (
        <Container maxWidth="md" className="container">
          <Paper elevation={3} className="paper" style={{ backgroundColor: '#FFF3B0' }}>
            <Typography variant="h4" gutterBottom style={{ color: '#35605A' }}>
              Welcome to StorySync!
            </Typography>
            {user ? (
              <Typography variant="body1" paragraph>
                Welcome back! Explore the latest book club discussions or start your own.
              </Typography>
            ) : (
              <Typography variant="body1" paragraph style={{ color: '#5E4955' }}>
                Welcome to StorySync, the ultimate app designed to revolutionize your book club discussions and elevate your reading journey! Say goodbye to scattered emails, endless threads, and missed meeting notes. With StorySync, organizing and participating in book club discussions has never been easier.
              </Typography>
            )}
            {!user && (
              <div className="buttonContainer">
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/signup"
                  style={{ backgroundColor: '#CA895F' }}
                >
                  Make an account
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  component={Link}
                  to="/login"
                  style={{ borderColor: '#32021F', color: '#32021F' }}
                >
                  Login
                </Button>
              </div>
            )}
          </Paper>
        </Container>
      );
            }

    // return (
    //     <Container maxWidth="md" className="container">
    //       <Paper elevation={3} className="paper">
    //         <Typography variant="h4" gutterBottom>
    //           Welcome to StorySync!
    //         </Typography>
    //         {user ? (
    //           <Typography variant="body1" paragraph>
    //             Welcome back! Explore the latest book club discussions or start your own.
    //           </Typography>
    //         ) : (
    //           <Typography variant="body1" paragraph>
    //             Welcome to StorySync, the ultimate app designed to revolutionize your book club discussions and elevate your reading journey! Say goodbye to scattered emails, endless threads, and missed meeting notes. With StorySync, organizing and participating in book club discussions has never been easier.
    //           </Typography>
    //         )}
    //         {!user && (
    //           <div className="buttonContainer">
    //             <Button
    //               variant="contained"
    //               color="primary"
    //               component={Link}
    //               to="/signup"
    //             >
    //               Make an account
    //             </Button>
    //             <Button
    //               variant="outlined"
    //               color="primary"
    //               component={Link}
    //               to="/login"
    //             >
    //               Login
    //             </Button>
    //           </div>
    //         )}
    //       </Paper>
    //     </Container>
    //   );
    // };

export default Homepage;