import {TextField, Button, Box, Typography} from '@mui/material';
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useState, useContext, useEffect} from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom';

import { BooksContext } from './App';
import { UserContext } from './App';



function NewBookForm() {
    const {setBooks} = useContext(BooksContext)
    const {user} = useContext(UserContext)
    const navigate = useNavigate()

    const newBookSchema = Yup.object().shape({
        title: Yup.string().required('Book titles required!'),
        author: Yup.string().required('Author required!'),
        cover: Yup.string()
    })

    const formik = useFormik({
        initialValues: {
            title: '',
            author: '',
            cover: ''
        },
        validationSchema: newBookSchema,
        onSubmit: (values, {resetForm}) => {
            fetch('/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.error('Error:', response.status);
                    return response.json().then(errorData => {
                        console.error('Error Data:', errorData);
                        throw new Error('Request failed');
                    });
                }
            }) 
            .then(({ books }) => {
                setBooks(books);
                resetForm({ values: '' });
                navigate('/home');
            })
            .catch(error => {
                console.error('Request failed:', error.message);
            });
        },
    });
    return (
    
        <Box>
            {user && (
            <Typography variant="h5" gutterBottom className= "formTitle">
            Add a book to our collection!
          </Typography>
            )}
          {user && (
            <form className= 'form' onSubmit= {formik.handleSubmit}>
                <TextField id= 'title' label= "Title" variant= 'outlined' required value= {formik.values.title} onChange={formik.handleChange}  onBlur = {formik.handleBlur}/>
                {formik.touched.title && formik.errors.title && <Typography color="error">{formik.errors.title}</Typography>}
                <TextField id="author" label= 'Author' variant='outlined' required  value={formik.values.author} onChange={formik.handleChange} onBlur = {formik.handleBlur}/>
                {formik.touched.author && formik.errors.author && <Typography color="error">{formik.errors.author}</Typography>}
                <TextField id="cover" label= 'Cover' variant='outlined' required  value={formik.values.cover} onChange={formik.handleChange} onBlur = {formik.handleBlur}/>
                {formik.touched.cover && formik.errors.cover && <Typography color="error">{formik.errors.cover}</Typography>}
            <Button variant= "contained" type="submit"> Submit</Button>
            </form>
          )}
        </Box>
        )
    }
    
    export default NewBookForm; 