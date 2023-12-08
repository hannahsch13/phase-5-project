import React from "react";

// import ReactDOM from "react-dom/client";
// import {createBrowserRouter, RouterProvider} from "react-router-dom"
import "./index.css";
import { createRoot } from "react-dom/client";

import App from "./components/App";
// import Bookclub from "./components/Bookclub"
// import Profile from "./components/Profile"
// import BookInfo from "./components/BookInfo"
// import components


const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);







// const router = createBrowserRouter ([
//     {
//         path: "/",
//         element: <App/>,
//         children: [
//             {
//                 path: '/home',
//                 element: <Homepage/>,
//             },
//             {
//                 path: '/bookclub',
//                 element: <Bookclub/>,
//             },
//             {
//                 path: '/profile',
//                 element: <Profile/>,
//             },
//             {
//                 path: 'book/:id',
//                 element: <BookInfo/>
//             }
//         ]
//     }
// ])



// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <RouterProvider router= {router}/>
// );