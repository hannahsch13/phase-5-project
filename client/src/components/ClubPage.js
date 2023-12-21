import { Typography, Card, CardMedia, Container, Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton, Divider } from '@mui/material';
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useState, useContext, useEffect} from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import NewBookForm from './NewBookForm'
import PostInput from './PostInput';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { ClubContext, PostsContext } from './App'
import { UsersContext } from './App';
import { UserContext } from './App';


function ClubPage() {
    const {club, setClub} = useContext(ClubContext)
    const {users} = useContext(UsersContext)
    const [isLoading, setIsLoading] = useState(true);
    const {user} = useContext(UserContext)
    const [selectedBook, setSelectedBook] = useState(null);

    const {posts, setPosts} = useContext(PostsContext)


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

          const handleDeletePost = async (postId) => {
            try {
              const response = await fetch(`/posts/${postId}`, {
                method: 'DELETE',
              });
          
              if (response.ok) {
                // Remove the deleted post from the local state
                setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
                console.log('Post deleted successfully');
              } else {
                console.error('Failed to delete post');
              }
            } catch (error) {
              console.error('Error deleting post:', error);
            }
          };

          const handleEditPost = async (postId, updatedBody) => {
            try {
              const response = await fetch(`/posts/${postId}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  body: updatedBody,
                }),
              });
          
              if (response.ok) {
                // Update the local state with the edited post
                setPosts((prevPosts) =>
                  prevPosts.map((post) =>
                    post.id === postId ? { ...post, body: updatedBody } : post
                  )
                );
                console.log('Post edited successfully');
              } else {
                console.error('Failed to edit post');
              }
            } catch (error) {
              console.error('Error editing post:', error);
            }
          };
          
    

          const postsArray = Object.values(posts);
          
    return (
        <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
          <Paper elevation={3} style={{ padding: '16px', backgroundColor: '#FDF0D5' }}>
            <Typography variant="h2" gutterBottom style={{ color: '#40531B', fontFamily: 'Bokor', textAlign: 'center' }}>
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
            <Typography variant="h6" style={{ marginTop: '16px', color: '#40531B', fontFamily: 'Rakkas', textDecoration: 'underline' }}>
              Book Details:
            </Typography>
            <Card sx={{ backgroundColor: '#FFF7EB', padding: '16px', borderRadius: '8px' }}>
              <CardMedia component="img" alt={selectedBook.title} height="300" image={selectedBook.cover} />
              <Typography variant="h4" style={{ marginTop: '16px', color: '#5E4955', fontFamily: 'Bokor', textAlign: 'center' }}>
                {selectedBook.title}
              </Typography>
              <Typography variant="body1" style={{ marginTop: '8px', color: '#5E4955', fontFamily: 'PT Serif', textAlign: 'center' }}>
                By {selectedBook.author}
              </Typography>
              {/* Add other book details */}
              <PostInput onSubmit={handlePostsSubmit} />
              <div>
                <Typography variant="h6" style={{ marginTop: '16px', color: '#CA895F', fontFamily: 'Bokor' }}>
                  Discussion notes:
                </Typography>
                <List>
                  {postsArray
                    .filter((post) => post.book_id === selectedBook.id)
                    .map((post) => (
                      <ListItem key={post.id || post.body} alignItems="flex-start">
                        <ListItemText
                          primary={post.body || 'No content'}
                          secondary={`${post.user.name} (@${post.user.username})`}
                        />
                        {user.id === post.user_id && (
                          <div>
                            <IconButton onClick={() => handleEditPost(post.id, prompt('Edit your post:', post.body))}>
                              <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDeletePost(post.id)}>
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        )}
                      </ListItem>
                    ))}
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

    