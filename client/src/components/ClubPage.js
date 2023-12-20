import { Typography, Card, CardMedia, Container, Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useState, useContext, useEffect} from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import NewBookForm from './NewBookForm'
import PostInput from './PostInput';

import { ClubContext } from './App'
import { UsersContext } from './App';
import { UserContext } from './App';


function ClubPage() {
    const {club, setClub} = useContext(ClubContext)
    const {users} = useContext(UsersContext)
    const [isLoading, setIsLoading] = useState(true);
    const {user} = useContext(UserContext)
    const [selectedBook, setSelectedBook] = useState(null);
    const [posts, setPosts] = useState([]);

    // console.log(user)
    // console.log(club)

    // useEffect(() => {
    //   const fetchClubDetails = async () => {
    //     try {
    //       if (user) {
    //         const response = await fetch(`/user/bookclub/${user.id}`);
    //         if (!response.ok) {
    //           throw new Error(`HTTP error! Status: ${response.status}`);
    //         }
  
    //         const data = await response.json();
    //         setClub(data);
    //       }
    //     } catch (error) {
    //       console.error('Error fetching club details:', error);
    //     } finally {
    //       setIsLoading(false);
    //     }
    //   };
  
    //   fetchClubDetails();
    // }, [user, setClub]);

  
    // if (isLoading) {
    //   return <p>Loading...</p>;
    // }

    // const handleBookClick = (book) => {
    //     setSelectedBook(book);
    //   };
    
    // const handlePostsSubmit = async (post) => {
    //     try {
    //       const response = await fetch('/posts', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //           body: post,
    //           user_id: user.id, 
    //           book_id: selectedBook.id,
    //         }),
    //       });
      
    //       if (!response.ok) {
    //         throw new Error('Failed to submit comment');
    //       }
    //       console.log('Comment submitted successfully');
    //     } catch (error) {
    //       console.error('Error submitting comment:', error);
    //     }
    //       console.log(selectedBook)
    //       const postsResponse = await fetch(`/posts/${selectedBook.id}`);
    //       if (postsResponse.ok) {
    //         const postsData = await postsResponse.json();
    //         setPosts(postsData);
    //     }
        // };
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
          }, [user, setClub, setIsLoading]);
        
          // Fetch posts when selectedBook changes
          useEffect(() => {
            const fetchPosts = async () => {
              try {
                if (selectedBook) {
                  const postsResponse = await fetch(`/posts/${selectedBook.id}`);
                  if (postsResponse.ok) {
                    const postsData = await postsResponse.json();
                    console.log('Posts data:', postsData);
                    setPosts(postsData);
                  } else {
                    console.error('Failed to fetch posts');
                  }
                }
              } catch (error) {
                console.error('Error fetching posts:', error);
              }
            };
        
            fetchPosts();
          }, [selectedBook, setPosts]);
        
          // Handle book click
          const handleBookClick = (book) => {
            setSelectedBook(book);
          };
        
          // Handle posts submit
          const handlePostsSubmit = async (post) => {
            try {
              const response = await fetch('/posts', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  body: post,
                  user_id: user.id,
                  book_id: selectedBook.id,
                }),
              });
        
              if (!response.ok) {
                throw new Error('Failed to submit comment');
              }
              console.log('Comment submitted successfully');
            } catch (error) {
              console.error('Error submitting comment:', error);
            }
        
            // Fetch posts after submitting a comment
            const fetchPosts = async () => {
              try {
                if (selectedBook) {
                  const postsResponse = await fetch(`/posts/${selectedBook.id}`);
                  if (postsResponse.ok) {
                    const postsData = await postsResponse.json();
                    console.log('Posts data:', postsData);
                    setPosts(postsData);
                  } else {
                    console.error('Failed to fetch posts');
                  }
                }
              } catch (error) {
                console.error('Error fetching posts:', error);
              }
            };
        
            fetchPosts();
          };

          console.log(posts)

          const postsArray = Object.values(posts);
          
    return (
        <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
          <Paper elevation={3} style={{ padding: '16px', backgroundColor: '#FDF0D5' }}>
            <Typography variant="h2" gutterBottom style={{ color: '#371A37', fontFamily: 'Bokor', textAlign: 'center' }}>
              Your Book Club!
            </Typography>
            <Typography variant="h4" style={{ marginTop: '16px', color: '#40531B', fontFamily: 'Rakkas', textAlign: 'center' }}>
              {club.club_name}
            </Typography>
            <Card>
              <CardMedia
                component="img"
                alt={club.club_name}
                height="300"
                image={club.picture}
              />
            </Card>
            {club.members && (
              <div>
                <Typography variant="h6" style={{ marginTop: '16px', color: '#40531B', fontFamily: 'Rakkas', textDecoration: 'underline' }}>
                  Members:
                </Typography>
                <List>
                  {club.members.map((member) => (
                    <ListItem key={member.id} divider>
                        <ListItemText>
                      <Typography variant= 'subtitle1' style={{ marginTop: '16px', color: '#371A37', fontFamily: 'PT Serif', fontWeight: 'bold' }}> 
                        {member.name}
                      </Typography>
                      <Typography variant= 'body1' style={{ marginTop: '16px', color: '#371A37', fontFamily: 'PT Serif' }}> 
                        {`@${member.username}`}
                      </Typography>
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              </div>
            )}
            {club.books && (
              <div>
                <Typography variant="h6" style={{ marginTop: '16px', color: '#40531B', fontFamily: 'Rakkas', textDecoration: 'underline' }}>
                  Books:
                </Typography>
                <List>
                  {club.books.map((book) => (
                <ListItem key={book.id} divider button onClick={() => handleBookClick(book)}>
                  <ListItemAvatar>
                    <Avatar alt={book.title} src={book.cover} />
                  </ListItemAvatar>
                  <ListItemText>
                  <Typography variant= 'subtitle1' style={{ marginTop: '16px', color: '#371A37', fontFamily: 'PT Serif', fontWeight: 'bold' }}> 
                        {book.title}
                      </Typography>
                      <Typography variant= 'body1' style={{ marginTop: '16px', color: '#371A37', fontFamily: 'PT Serif' }}> 
                        {book.author}
                      </Typography>
                      </ListItemText>
                </ListItem>
              ))}
            </List>
          </div>
        )}
        {selectedBook && (
          <div>
            <Typography variant="h6" style={{ marginTop: '16px', color: '#CA895F' }}>
              Book Details:
            </Typography>
            <Card>
              {/* Display additional details of the selected book here */}
              <CardMedia component="img" alt={selectedBook.title} height="300" image={selectedBook.cover} />
              <Typography variant="h6" style={{ marginTop: '16px', color: '#5E4955' }}>
                {selectedBook.title}
              </Typography>
              <Typography variant="body1" style={{ marginTop: '8px', color: '#5E4955' }}>
                Author: {selectedBook.author}
              </Typography>
              {/* Add other book details as needed */}
              <PostInput onSubmit={handlePostsSubmit} />
              <div>
                <Typography variant="h6" style={{ marginTop: '16px', color: '#CA895F' }}>
                  Discussion notes:
                </Typography>
                <List>
                {postsArray.map((post) => 
                    post && post.body ? (
                <ListItem key={post.id || post.body}  alignItems="flex-start">
                <ListItemText primary={post.body}/>
                </ListItem>
                    ): null
                )}
            </List>
              </div>
            </Card>
          </div>
        )}
        <div style={{ marginTop: '2rem' }}>
          <NewBookForm />
        </div>
      </Paper>
    </Container>
    );
}

    export default ClubPage;

    