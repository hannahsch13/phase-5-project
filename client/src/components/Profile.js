import React, { useContext, useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
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
    const [formData, setFormData] = useState({
      name: '',
      username: '',
      email: '',
    });

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
  
        // You can add a success message or redirect the user after successful update
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    };
  
    const handleDelete = async () => {
      try {
        await fetch(`/user/${user.id}`, {
          method: 'DELETE',
        });
  
        // You can add a success message or redirect the user after successful deletion
      } catch (error) {
        console.error('Error deleting user profile:', error);
      }
    };
  
    return (
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={3}
          sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <Typography variant="h5">Update Profile</Typography>
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
            <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
              Update Profile
            </Button>
          </form>
          <Button
            variant="outlined"
            color="error"
            onClick={handleDelete}
            sx={{ marginTop: 2 }}
          >
            Delete Profile
          </Button>
        </Paper>
      </Container>
    );
  };
  
export default Profile;