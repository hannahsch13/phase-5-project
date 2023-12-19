import { Typography, Card, CardMedia, Container, Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useState, useContext, useEffect} from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import NewBookForm from './NewBookForm'

import { ClubContext } from './App'
import { UsersContext } from './App';
import { UserContext } from './App';


function ClubPage() {
    const {club, setClub} = useContext(ClubContext)
    const {users} = useContext(UsersContext)
    const [isLoading, setIsLoading] = useState(true);
    const {user} = useContext(UserContext)

    console.log(user)


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

console.log(club.books)

  
    if (isLoading) {
      return <p>Loading...</p>;
    }
    return (
        <Container maxWidth="md">
          <Paper elevation={3} style={{ padding: '16px', backgroundColor: '#CA895F' }}>
            <Typography variant="h4" gutterBottom style={{ color: '#35605A' }}>
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
            <Typography variant="h6" style={{ marginTop: '16px', color: '#5E4955' }}>
              {club.club_name}
            </Typography>
            {club.members && (
              <div>
                <Typography variant="h6" style={{ marginTop: '16px', color: '#CA895F' }}>
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
            {club.books && (
              <div>
                <Typography variant="h6" style={{ marginTop: '16px', color: '#CA895F' }}>
                  Books:
                </Typography>
                <List>
                  {club.books.map((book) => (
                    <ListItem key={book.id} divider>
                      <ListItemAvatar>
                        <Avatar alt={book.title} src={book.cover} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={book.title}
                        secondary={`Author: ${book.author}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </div>
            )}
            <div style={{ marginTop: '2rem' }}>
              <NewBookForm />
            </div>
          </Paper>
        </Container>
      );
    };


    export default ClubPage;

