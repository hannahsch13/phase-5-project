import {TextField, Button, Box, Typography} from '@mui/material';
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useState, useContext, useEffect} from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom';

import { ClubContext } from './App'
import { UserContext } from './App';



function NewClubForm() {
    const {setClub} = useContext(ClubContext)
    const {user} = useContext(UserContext)
    const navigate = useNavigate()

    const newClubSchema = Yup.object().shape({
        club_name: Yup.string().required('Club name required!'),
        picture: Yup.string()
    })

const formik = useFormik({
    initialValues: {
        club_name: '',
        picture: ''
    },
    validationSchema: newClubSchema,
    onSubmit: (values, {resetForm}) => {
        fetch('/clubs', {
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
        .then(({ club }) => {
            setClub(club);
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
        Create a new book club!
      </Typography>
        )}
      {user && (
        <form className= 'form' onSubmit= {formik.handleSubmit}>
            <TextField id= 'club_name' label= "Club Name" variant= 'outlined' required value= {formik.values.club_name} onChange={formik.handleChange}  onBlur = {formik.handleBlur}/>
            {formik.touched.club_name && formik.errors.club_name && <Typography color="error">{formik.errors.club_name}</Typography>}
            <TextField id="picture" label= 'Picture' variant='outlined' required  value={formik.values.picture} onChange={formik.handleChange} onBlur = {formik.handleBlur}/>
            {formik.touched.picture && formik.errors.picture && <Typography color="error">{formik.errors.picture}</Typography>}
        <Button variant= "contained" type="submit"> Submit</Button>
        </form>
      )}
    </Box>
    )
}

export default NewClubForm; 