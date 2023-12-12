import React, { useEffect, useState, createContext} from "react";
import {Outlet} from "react-router-dom"
// import { Switch, Route } from "react-router-dom";
import {Button} from "@mui/material";

// import index from './styling/index.css';
import Signup from "./Signup";
import NavBar from "./NavBar";


export const OutletContext = createContext();

function App() {
  const [user, setUser] = useState(null)

  useEffect(()=> {
    fetch('/authorized')
    .then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => setUser(user))
      } else {
        console.log('error')
      }
    })
  }, [])

  const context = {user, setUser}

// function handleLogout() {
//   fetch('/logout', {
//     method: 'DELETE'
//   }).then((resp) => {
//     if (resp.ok) {
//       setUser(null)
//     }
//   })
// }

return (
  <div className='App'>
    <header>
      <NavBar user={user} setUser={setUser}/>
    </header>
    <OutletContext.Provider value= {{user, setUser}}>
    <Outlet context={context}/>
    </OutletContext.Provider>
  </div>
);
}

//   if (!user) {
//     return <Signup setUser={setUser} />
//   }
//   return <div>
//     in the site!
//     <Button variant= 'contained' onClick= {handleLogout}> Logout</Button>
//     <Outlet />
//   </div>
// }

export default App;
