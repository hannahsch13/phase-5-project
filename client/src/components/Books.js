import React, { useContext, useEffect } from "react";
import { useOutletContext } from "react-router-dom"
import { Typography, Button, Container, Paper, Card, CardContent, CardMedia, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import {BooksContext, UserContext} from "./App"
import NewBookForm from "./NewBookForm"


function Books() {
    const {books, setBooks}= useContext(BooksContext)
    const {user} = useContext(UserContext)

    const booksArray = Object.values(books);
    console.log(booksArray)

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
                    {user && (
                        <Button >
                            Add book to club
                        </Button>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ) : null
          )}
        </Grid>
        <div style={{ marginTop: '2rem' }}>
          <NewBookForm />
        </div>
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