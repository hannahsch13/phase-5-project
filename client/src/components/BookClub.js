import React, { useContext } from "react";
import { useOutletContext } from "react-router-dom"
import { Typography, Button, Container, Paper, Card, CardContent, CardMedia, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import NewClubForm from "./NewClubForm";
import { ClubContext } from "./App";


function BookClub(){ 
    const {club} = useContext(ClubContext)

    if (!club) {
        return <p>Loading...</p>; 
      }
    
    
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

//     return ( 
//         <div>
//           <div> <NewClubForm/> </div>
//           <div>
//             {clubArray.map((clubData) =>
//               clubData && clubData.club_name ? (
//                 <div key={clubData.id}>
//                   <p>{clubData.club_name}</p>
//                   {clubData.picture && (
//                     <img src={clubData.picture} alt={`${clubData.club_name} Club`} />
//                   )}
//                 </div>
//               ) : null
//             )}
//           </div>
//         </div> 
//       );
//  }
export default BookClub;