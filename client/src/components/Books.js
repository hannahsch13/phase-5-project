import React, { useContext, useEffect } from "react";
import { useOutletContext } from "react-router-dom"
import { Typography, Button, Container, Paper, Card, CardContent, CardMedia, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import {BooksContext} from "./App"
import NewBookForm from "./NewBookForm"


function Books() {
    const {books, setBooks}= useContext(BooksContext)

    const booksArray = Object.values(books);
    console.log(booksArray)


    return (
        <div>
        <h1>Books</h1>
        <div>
            <NewBookForm/>
        </div>
        </div> 
    )

};

export default Books; 