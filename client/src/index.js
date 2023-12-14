import React from "react";

import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import "./index.css";
// import { createRoot } from "react-dom/client";

import BookClub from "./components/BookClub"
import Profile from "./components/Profile"
import BookInfo from "./components/BookInfo"
import Homepage from "./components/Homepage"
import Signup from "./components/Signup";
import Login from './components/Login';
import App from "./components/App";
import ProfileList from "./components/ProfileList";
import ClubPage from "./components/ClubPage"



const router = createBrowserRouter ([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: '/home',
                element: <Homepage/>,
            },
            {
                path: '/clubs',
                element: <BookClub/>,
            },
            {
                path: '/profile',
                element: <Profile/>,
            },
            {
                path: '/book/:id',
                element: <BookInfo/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <Signup/>
            },
            {
                path: '/users',
                element: <ProfileList/>
            }, 
            {
                path: '/mybookclub',   
                element: <ClubPage />
            }    
        ]
    }
]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router= {router}/>
    );


