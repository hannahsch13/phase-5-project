import { Typography, Card, CardMedia, Container, Paper, List, ListItem, ListItemText } from '@mui/material';
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useState, useContext, useEffect} from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom';

import { ClubContext } from './App'
import { UserContext } from './App';


function ClubPage() {
    const {club, setClub} = useContext(ClubContext)
    const {user} = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchClubDetails = async () => {
        try {
          if (user) {
            const response = await fetch(`/user/bookclub/${user.id}`);
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
  
            const data = await response.json();
            setClub(data);
          }
        } catch (error) {
          console.error('Error fetching club details:', error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchClubDetails();
    }, [user, setClub]);
  
    if (isLoading) {
      return <p>Loading...</p>;
    }

 

    return (
        <Container maxWidth="md">
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h4" gutterBottom>
              Your Book Club!
            </Typography>
            <Card>
              <CardMedia
                component="img"
                alt={club.club_name}
                height="300"
                image={club.picture}
              />
            </Card>
            <Typography variant="h6" style={{ marginTop: '16px' }}>
              {club.club_name}
            </Typography>
            {club.members && (
              <div>
                <Typography variant="h6" style={{ marginTop: '16px' }}>
                  Members:
                </Typography>
                <List>
                  {club.members.map((member) => (
                    <ListItem key={member.id} divider>
                      <ListItemText
                        primary={member.name}
                        secondary={`@${member.username}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </div>
            )}
          </Paper>
        </Container>
      );
    };
    
    export default ClubPage;

