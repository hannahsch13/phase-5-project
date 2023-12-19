import React, { useContext, useEffect } from "react";
import { useOutletContext } from "react-router-dom"
import { Typography, Button, Container, Paper, Card, CardContent, CardMedia, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import {ClubBooksContext, UserContext, BooksContext, CurrentClubContext} from "./App"
import NewBookForm from "./NewBookForm"


function Books() {
    const {clubBooks, setClubBooks}= useContext(ClubBooksContext)
    const {user} = useContext(UserContext)
    const {currentClub, setCurrentClub} = useContext(CurrentClubContext)
    const {books, setBooks} = useContext(BooksContext)


    const booksArray = Object.values(books);
    console.log(books)

    // const handleAddBook = () => {
    //     const formData = {
    //       club_id: user.bookclub_id,
    //       book_id: '1', // Replace with the actual book_id
    //       month: 'January', 
    //     };
    
        
    //     fetch('/add_book_to_club', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(formData),
    //     })
    //       .then((response) => response.json())
    //       .then((data) => {
    //         console.log(data);
    //         // Handle success or display a success message to the user
    //       })
    //       .catch((error) => {
    //         console.error('Error:', error);
    //         // Handle error or display an error message to the user
    //       });
    //   };
    // useEffect(() => {
    //     // Fetch books for the current club when the component mounts or when the currentClub changes
    //     if (currentClub) {
    //         fetch(`/get_books_by_club/${books.club_id}`)
    //             .then((response) => response.json())
    //             .then((data) => {
    //                 setClubBooks(data.clubBooks);
    //             })
    //             .catch((error) => {
    //                 console.error('Error fetching books:', error);
    //             });
    //     }
    // }, [currentClub, setClubBooks]);

    // const handleAddBook = (bookId) => {
    //     const formData = {
    //         club_id: user.bookclub_id,
    //         book_id: bookId,
    //         month: 'January', // Replace with the actual month or get it dynamically
    //     };

    //     fetch('/add_book_to_club', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(formData),
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data);
    //             // Handle success or display a success message to the user
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //             // Handle error or display an error message to the user
    //         });
    // };

    

return (
    <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
      <Paper elevation={3} sx={{ padding: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          What our Book Clubs are reading!
        </Typography>
        <Grid container spacing={2}>
          {booksArray.map((booksData) =>
            booksData && booksData.title ? (
              <Grid item key={booksData.id} xs={12} sm={6} md={4}>
                <Card>
                  {booksData.cover && (
                    <CardMedia
                      component="img"
                      alt={`${booksData.title} book`}
                      height="250"
                      image={booksData.cover}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {booksData.title} 
                    </Typography>
                    <Typography variant="h6" component="div">
                    {booksData.bookclubs.club_name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ) : null
          )}
        </Grid>
      </Paper>
    </Container>
  );
}


export default Books; 



// return (
//     <div>
//     <h1>Books</h1>
//     <div>
//         <NewBookForm/>
//     </div>
//     </div> 
// )

// };