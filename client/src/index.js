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
                path: '/bookclub',
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
            }    
        ]
    }
]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router= {router}/>
    );


// import React from "react";
// import ReactDOM from "react-dom";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import "./index.css";
// import { createRoot } from "react-dom/client";

// import App from "././components/BookClub
// import Homepage from "./components/Homepage";
// import BookClub from "./components/BookClub";
// import Profile from "./components/Profile";
// import BookInfo from "./components/BookInfo";

// const root = createRoot(document.getElementById('root'));

// root.render(
//   <Router>
//     <Switch>
//       <Route path="/" element={<App />} />
//       <Route path="/home" element={<Homepage />} />
//       <Route path="/bookclub" element={<BookClub />} />
//       <Route path="/profile" element={<Profile />} />
//       <Route path="/book/:id" element={<BookInfo />} />
//     </Switch>
//   </Router>
// );











    // const container = document.getElementById("root");
    // const root = createRoot(container);
    // root.render(<App />);