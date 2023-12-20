import React, { useContext, useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import {useFormik} from 'formik'
import * as Yup from 'yup'



import { UserContext } from "./App";


const Profile = () => {
    const { id: userId } = useParams();
    const { user, setUser } = useContext(UserContext);

    const userArray = user ? Object.values(user) : [];

    console.log(userArray)

    const formik = useFormik({
        initialValues: {
            username: userArray[0] || '', // Set default value to an empty string
            name: userArray[1] || '',     // Set default value to an empty string
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            name: Yup.string().required('Name is required'),
        }),
        onSubmit: (values) => {
            // Send a PATCH request to update user details
            fetch(`/user/${user.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
                .then(response => response.json())
                .then(data => {
                    // Update the user context with the new data
                    setUser(data);
                    // Handle the response from the server if needed
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },
    });

    useEffect(() => {
        // Populate the form data with the user context data
        formik.setValues({
            username: userArray[0] || '', // Set default value to an empty string
            name: userArray[1] || '',     // Set default value to an empty string
        });
    }, [userArray, formik, setUser]); // Include formik and setUser in the dependencies


    return (
        <div>
            <h1>User Profile</h1>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.username && formik.errors.username && (
                    <div>{formik.errors.username}</div>
                )}

                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && (
                    <div>{formik.errors.name}</div>
                )}

                <button type="submit">Update Profile</button>
            </form>

            <div>
                <p>Current Username: {userArray[0]}</p>
                <p>Current Name: {userArray[1]}</p>
            </div>
        </div>
    );
};

export default Profile;