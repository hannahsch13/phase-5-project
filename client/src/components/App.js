import React, { useEffect, useState } from "react";
// import { Switch, Route } from "react-router-dom";
import {Button} from "@mui/material";

// import index from './styling/index.css';
import Signup from "./Signup";

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

function handleLogout() {
  fetch('/logout', {
    method: 'DELETE'
  }).then((resp) => {
    if (resp.ok) {
      setUser(null)
    }
  })
}

  if (!user) {
    return <Signup setUser={setUser} />
  }
  return <div>
    in the site!
    <Button variant= 'contained' onClick= {handleLogout}> Logout</Button>
  </div>
}

export default App;
