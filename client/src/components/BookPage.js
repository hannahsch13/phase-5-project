import { Typography, Card, CardMedia, Container, Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useState, useContext, useEffect} from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom';


import { ClubContext } from './App';
import { BookContext } from './App';
import { UserContext } from './App';

function BookPage() {
    const {club, setClub} = useContext(ClubContext)
    const {book, setBook} = useContext(BookContext)
    const {user} = useContext(UserContext)

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
}


export default BookPage;