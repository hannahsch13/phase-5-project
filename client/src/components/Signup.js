import {TextField, Button, Box, Typography} from '@mui/material';
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

//     const formik = useFormik({
//         initialValues:{
//             username: '',
//             email: '',
//             password: '',
//             passwordConfirmation: ''
//         },
//         validationSchema: signupSchema,
//         onSubmit: async (values, {resetForm}) => {
//             try {
//                 const response = await fetch('/users', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(values)
//             });
            
//             if (response.ok) {
//                 const {user} = await response.json();
//                 setUser(user);
//                 resetForm({values: ''})
//                 navigate('/home');
//             } else {
//                 console.error('Error:', response.status);
//                 const errorData = await response.json();
//                 console.error('Error Data:', errorData);
//             }
//         } catch (error) {
//             console.error('Request failed:', error.message);
//         }
//     },
// });    

const formik = useFormik({
    initialValues: {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    },
    validationSchema: signupSchema,
    onSubmit: (values, { resetForm }) => {
        fetch('/users', {
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
            .then(({ user }) => {
                setUser(user);
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
            {/* {Object.keys(formik.errors).map((key) => <li> {formik.errors[key]}</li>)} */}
            <form onSubmit= {formik.handleSubmit}>
                <TextField id= 'username' label= "Username" variant= 'outlined' required value= {formik.values.username} onChange={formik.handleChange}  onBlur = {formik.handleBlur}/>
                {formik.touched.username && formik.errors.username && <Typography color="error">{formik.errors.username}</Typography>}
                <TextField id="email" label= 'Email' variant='outlined' required  value={formik.values.email} onChange={formik.handleChange} onBlur = {formik.handleBlur}/>
                {formik.touched.email && formik.errors.email && <Typography color="error">{formik.errors.email}</Typography>}
                <TextField id="password" label= 'Password' type= 'password' variant='outlined' required value={formik.values.password} onChange={formik.handleChange} onBlur = {formik.handleBlur}/>
                {formik.touched.password && formik.errors.password && <Typography color="error">{formik.errors.password}</Typography>}
                <TextField id="passwordConfirmation" label= 'Confirm Password' type= 'password' variant='outlined' required value={formik.values.passwordConfirmation} onChange={formik.handleChange} onBlur = {formik.handleBlur}/>
                {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (<Typography color="error">{formik.errors.passwordConfirmation}</Typography>)}
            <Button variant= "contained" type="Submit"> Submit</Button>
            </form>
        </Box>
        )
}

export default Signup;