import React, { useContext, useEffect, useState} from "react";
import { Navigate, useNavigate, useOutletContext, useParams } from "react-router-dom";
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {
    TextField,
    Button,
    Container,
    Typography,
    Paper,
  } from '@mui/material';



import { UserContext } from "./App";


function Profile() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      name: '',
      username: '',
      email: '',
    });
    const [successMessage, setSuccessMessage] = useState('');

    console.log(user)
  
    useEffect(() => {
        if (user && user.id) {
            setFormData({
              name: user.name,
              username: user.username,
              email: user.email,
            });
          }
        }, [user]);
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        await fetch(`/user/${user.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        setSuccessMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };
  
    const handleDelete = async () => {
      try {
        await fetch(`/user/${user.id}`, {
          method: 'DELETE',
        });

        await fetch('/logout', {
            method: 'DELETE',
        });
    
        setUser(null);
  
        navigate('/home')
      } catch (error) {
        console.error('Error deleting user profile:', error);
      }
    };
  
    return (
      <Container component="main" maxWidth="sm" sx={{ marginTop: 4 }}>
        <Paper
          elevation={3}
          sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#FDF0D5'  }}
        >
          <Typography variant="h5" gutterBottom style={{ color: '#40531B', fontFamily: 'Bokor', textAlign: 'center' }} >Update Profile</Typography>
          {successMessage && <p style={{ color: 'green', fontFamily: 'PT Serif' }}>{successMessage}</p>}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              fullWidth
              required
            />
            <TextField
              label="Username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              margin="normal"
              fullWidth
              required
            />
            <TextField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              fullWidth
              required
            />
            <div sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <Button type="submit" variant="contained" style={{
              borderColor: '#32021F',
              color: '#FDF0D5',
              backgroundColor: '#371A37',
              fontFamily: 'PT Serif',
            }} sx={{ marginTop: 2 }}>
              Update Profile
            </Button>
            </div>
          </form>
          <Button
            variant="outlined"
            color="error"
            onClick={handleDelete}
            sx={{ marginTop: 2}}
            style = {{fontFamily: 'PT Serif' }}
          >
            Delete Profile
          </Button>
        </Paper>
      </Container>
    );
  };
  
export default Profile;