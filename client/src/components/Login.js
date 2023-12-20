import {TextField, Button, Box, Typography} from '@mui/material';
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useState, useContext} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import {UserContext} from './App'


function Login() {
    const {setUser} = useContext(UserContext)
    const navigate = useNavigate()

    const loginSchema = Yup.object().shape({
        username: Yup.string().required('Username required!'),
        password: Yup.string().required('Password required!')
    })

    const formik = useFormik({
        initialValues:{
            username: '',
            password: ''
        },
        validationSchema: loginSchema,
        onSubmit: (values, {resetForm}) => {
            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            }).then((resp) => {
                if (resp.ok) {
                    console.log('submitted')

                    resetForm({values: ''})
                    resp.json().then(({user}) => {
                        setUser(user)
                        console.log(user)
                        navigate('/home')
                        //navigate into site
                    })
                } else {
                    console.log('error fetching user')
                }
            })
        }
    })


    return (
        <Box sx={{ backgroundColor: '#FFEFD6', padding: '25px', borderRadius: '25px',  marginTop: '15px', marginRight: '50px',  marginLeft: '50px' }}>
        {/* {Object.keys(formik.errors).map((key) => <li> {formik.errors[key]}</li>)} */}
        <form className="form" onSubmit={formik.handleSubmit}>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            required
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{ marginBottom: '16px', fontFamily: 'PT Serif' }}
          />
          {formik.touched.username && formik.errors.username && (
            <Typography color="error">{formik.errors.username}</Typography>
          )}
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            required
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{ marginBottom: '16px', fontFamily: 'PT Serif' }}
          />
          {formik.touched.password && formik.errors.password && (
            <Typography color="error">{formik.errors.password}</Typography>
          )}
          <Button variant="contained" type="Submit" sx={{ fontFamily: 'PT Serif', backgroundColor: '#371A37', color: '#FDF0D5', borderColor: '#32021F' }}>
            Submit
          </Button>
        </form>
      </Box>
    );
}

export default Login;