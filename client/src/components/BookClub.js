import React, { useContext, useEffect } from "react";
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
        try {
            const response = await fetch(`/join/bookclub/${clubId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(club)
            });

            if (response.ok) {
                const updatedUserResponse = await fetch('/authorized');
                const updatedUserData = await updatedUserResponse.json();
                setUser(updatedUserData);
                console.log('Successfully joined the club!');
            } else {
                const errorData = await response.json();
                console.error('Error joining club:', errorData);
                alert('Error joining the club. Please try again.');
            }
        } catch (error) {
            console.error('Error joining club:', error);
            alert('An error occurred while joining the club. Please try again later.');
        }
    };

     
    
    const clubArray = Object.values(club);
 

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