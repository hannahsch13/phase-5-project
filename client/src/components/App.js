import React, { useEffect, useState, createContext} from "react";
import {Outlet} from "react-router-dom"
// import { Switch, Route } from "react-router-dom";
import {Button} from "@mui/material";

// import index from './styling/index.css';
import Signup from "./Signup";
import NavBar from "./NavBar";
import Homepage from "./Homepage";


export const UserContext = createContext();
export const ClubContext = createContext();

function App() {
  const [user, setUser] = useState(null)
  const [club, setClub] = useState('')
  

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


  useEffect(()=> {
    fetch('/users')
    .then((resp)=> resp.json())
    .then(setUser)
  }, []);

  useEffect(()=> {
    fetch('/clubs')
    .then((resp)=> resp.json())
    .then(setClub)
  }, []);


  // useEffect(() => {
  //   fetch('/clubs')
  //   .then((resp)=> resp.json())
  //   .then(setClub)
  // }, [])

  // useEffect(() => {
  //   const fetchData= async () => {
  //     try {
  //       const response= await fetch('/users');
  //       const data = await response.json();
  //       setUser(data);
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //     }  
  //   };
  //   fetchData();
  // }, []);

  const context = {
    user, 
    setUser,
    club,
    setClub
  }

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
      <NavBar user={user} setUser={setUser} club={club} setClub={setClub}/>
    </header>
    <ClubContext.Provider value= {{club, setClub}}>
    <UserContext.Provider value= {{user, setUser}}>
    <Outlet context={context}/>
    </UserContext.Provider>
    </ClubContext.Provider>
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
