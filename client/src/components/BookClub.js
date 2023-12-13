import React, { useContext } from "react";
import { useOutletContext } from "react-router-dom"
import { Typography, Button, Container, Paper, Card, CardContent, CardMedia, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import NewClubForm from "./NewClubForm";
import { ClubContext } from "./App";
import { UserContext } from "./App";


function BookClub(){ 
    const {club} = useContext(ClubContext)
    const {user, setUser} = useContext(UserContext)

    const handleJoinClub = async (clubId) => {
        const url = '/users';  // Adjust the URL based on your actual API endpoint
    
        try {
          const response = await fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_id: user.id,  // Assuming you have the user ID available in the user context
              bookclub_id: clubId,
            }),
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
    
          const data = await response.json();
          console.log(data.message);  // or perform any other actions
        } catch (error) {
          console.error('Error:', error);
        }
      };

    if (!club) {
        return <p>Loading...</p>; 
      }
     
    
    const clubArray = Object.values(club);
 
    // clubArray.forEach((clubData)=> {
    //     console.log(clubData.id);
    // });



    return (
        <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
          <Paper elevation={3} sx={{ padding: '2rem' }}>
            <Typography variant="h4" gutterBottom>
              Book Clubs
            </Typography>
            <Grid container spacing={2}>
              {clubArray.map((clubData) =>
                clubData && clubData.club_name ? (
                  <Grid item key={clubData.id} xs={12} sm={6} md={4}>
                    <Card>
                      {clubData.picture && (
                        <CardMedia
                          component="img"
                          alt={`${clubData.club_name} Club`}
                          height="140"
                          image={clubData.picture}
                        />
                      )}
                      <CardContent>
                        <Typography variant="h6" component="div">
                          {clubData.club_name}
                        </Typography>
                        {user && (
                            <Button onClick= {() => handleJoinClub(clubData.id)}>
                                Join Club
                            </Button>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ) : null
              )}
            </Grid>
            <div style={{ marginTop: '2rem' }}>
              <NewClubForm />
            </div>
          </Paper>
        </Container>
      );
    }

export default BookClub;