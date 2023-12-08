import {TextField, Button, Box} from '@mui/material';
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useState} from 'react'

function Signup({setUser}) {
    const [signup, setSignup] = useState(true)

    const signupSchema = Yup.object().shape({
        username: Yup.string().min(5, 'Too Short!').max(15, 'Too Long!').required('Required!'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(5, 'Too Short!').max(15, 'Too Long!').required('Required!')
    })

    const formik = useFormik({
        initialValues:{
            username: '',
            email: '',
            password: ''
        },
        validationSchema: signupSchema,
        onSubmit: (values) => {
            const endpoint = signup ? '/users' : '/login'
            fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            }).then((resp) => {
                if (resp.ok) {
                    resp.json().then(({user}) => {
                        setUser(user)
                        //navigate into site
                    })
                } else {
                    console.log('errors? handle them')
                }
            })
        }
    })

    function toggleSignup() {
        setSignup((currentSignup) => !currentSignup)
    }

    return (
        <Box>
            <Button onClick={toggleSignup}>{signup ? 'Login instead!' : 'Register for an account' } </Button>
            <form onSubmit= {formik.handleSubmit}>
                <TextField id= 'username' label= "Username" variant= 'outlined' required value= {formik.values.username} onChange={formik.handleChange} />
                {signup && <TextField id="email" label= 'Email' variant='outlined' required  value={formik.values.email} onChange={formik.handleChange}/>}
                <TextField id="password" label= 'password' type= 'password' variant='outlined' required value={formik.values.password} onChange={formik.handleChange}/>
            <Button variant= "contained" type="Submit"> Submit</Button>
            </form>
        </Box>
        )
}

export default Signup;