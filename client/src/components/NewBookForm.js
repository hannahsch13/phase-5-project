import {TextField, Button, Box, Typography} from '@mui/material';
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useState, useContext, useEffect} from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom';

import { ClubBooksContext } from './App';
import { UserContext } from './App';
// import { CurrentClubContext } from './App';
import { BooksContext } from './App';
import { ClubContext } from './App';



function NewBookForm() {
    const {clubBooks,setClubBooks} = useContext(ClubBooksContext)
    const {books, setBooks} = useContext(BooksContext)
    const {user} = useContext(UserContext)
    const navigate = useNavigate()
    // const {currentClub, setCurrentClub} = useContext(CurrentClubContext)
    const {club, setClub} = useContext(ClubContext)

    const [currentClub, setCurrentClub] = useState('');
    const [isLoading, setIsLoading] = useState(true);




console.log(club)
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

  const newBookSchema = Yup.object().shape({
    title: Yup.string().required('Book titles required!'),
    author: Yup.string().required('Author required!'),
    cover: Yup.string(),
  });

const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      cover: '',
    },
    validationSchema: newBookSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const requestBody = {
          ...values,

          club_id: club.id,
        };

        const response = await fetch(`/add_book_to_club/${user.id}/${club.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          console.error('Error:', response.status);
          const errorData = await response.json();
          console.error('Error Data:', errorData);
          throw new Error('Request failed');
        }

        const { message } = await response.json();
        console.log(message);

        setClubBooks([...clubBooks, values]); 

        resetForm({ values: '' });
      } catch (error) {
        console.error('Request failed:', error.message);
      }
    },
  });


  return (
    <Box
      sx={{
        backgroundColor: '#D6E1EA',
        padding: '16px',
        borderRadius: '25px',
      }}
    >
      {user && (
        <Typography variant="h5" gutterBottom className="formTitle" style={{ fontFamily: 'Bokor' }}>
          Add a book to the club collection!
        </Typography>
      )}
      {user && (
        <form className="form" onSubmit={formik.handleSubmit}>
          <TextField
            id="title"
            label="Title"
            variant="outlined"
            required
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ marginBottom: '16px', fontFamily: 'PT Serif' }}
          />
          {formik.touched.title && formik.errors.title && (
            <Typography color="error">{formik.errors.title}</Typography>
          )}
          <TextField
            id="author"
            label="Author"
            variant="outlined"
            required
            value={formik.values.author}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ marginBottom: '16px', fontFamily: 'PT Serif' }}
          />
          {formik.touched.author && formik.errors.author && (
            <Typography color="error">{formik.errors.author}</Typography>
          )}
          <TextField
            id="cover"
            label="Cover"
            variant="outlined"
            required
            value={formik.values.cover}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ marginBottom: '16px', fontFamily: 'PT Serif' }}
          />
          {formik.touched.cover && formik.errors.cover && (
            <Typography color="error">{formik.errors.cover}</Typography>
          )}
          <Button
            variant="contained"
            type="submit"
            style={{
              borderColor: '#32021F',
              color: '#FDF0D5',
              backgroundColor: '#371A37',
              fontFamily: 'PT Serif',
            }}
          >
            Submit
          </Button>
        </form>
      )}
    </Box>
  );
};
    export default NewBookForm; 
