import {TextField, Button, Box} from '@mui/material';
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useState, useContext} from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom';

import { OutletContext } from './App'


function Signup() {
    const { setUser } = useContext(OutletContext)
    const [type, setType] = useState('password');
    const navigate = useNavigate()

    const signupSchema = Yup.object().shape({
        username: Yup.string().min(5, 'Username Too Short!').max(15, 'Username Too Long!').required('Username required!'),
        email: Yup.string().email('Invalid email').required('Email required'),
        password: Yup.string().min(5, 'Password Too Short!').max(15, 'Password Too Long!').required('Password required!'),
        passwordConfirmation: Yup.string().required('Must confirm password').oneOf([Yup.ref('password')],'Passwords must match')
    })

    const formik = useFormik({
        initialValues:{
            username: '',
            email: '',
            password: '',
            passwordConfirmation: ''
        },
        validationSchema: signupSchema,
        onSubmit: (values, {resetForm}) => {
            fetch('/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            }).then((resp) => {
                if (resp.ok) {
                    resetForm({values: ''})
                    resp.json().then(({user}) => {
                        setUser(user)
                        navigate('/home')
                    })
                } else {
                    console.log('error')
                }
            })
        }
    })


    return (
        <Box>
            {Object.keys(formik.errors).map((key) => <li> {formik.errors[key]}</li>)}
            <form onSubmit= {formik.handleSubmit}>
                <TextField id= 'username' label= "Username" variant= 'outlined' required value= {formik.values.username} onChange={formik.handleChange} />
                <TextField id="email" label= 'Email' variant='outlined' required  value={formik.values.email} onChange={formik.handleChange}/>
                <TextField id="password" label= 'Password' type= 'password' variant='outlined' required value={formik.values.password} onChange={formik.handleChange}/>
                <TextField id="passwordConfirmation" label= 'Confirm Password' type= 'password' variant='outlined' required value={formik.values.passwordConfirmation} onChange={formik.handleChange}/>
            <Button variant= "contained" type="Submit"> Submit</Button>
            </form>
        </Box>
        )
}

export default Signup;