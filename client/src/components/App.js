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
export const UsersContext = createContext();
export const ClubsContext = createContext();
export const BooksContext = createContext();

function App() {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState(null)
  const [club, setClub] = useState('')
  const [clubs, setClubs] = useState('')
  const [books, setBooks] = useState('')

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
    .then(setUsers)
  }, []);

  useEffect(()=> {
    fetch('/clubs')
    .then((resp)=> resp.json())
    .then(setClubs)
  }, []);

  useEffect(()=>{
    fetch('/books')
    .then((resp)=> resp.json())
    .then(setBooks)
  },[]);


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
    setClub,
    users,
    setUsers,
    clubs, 
    setClubs,
    books,
    setBooks
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
      <NavBar user={user} setUser={setUser} club={club} setClub={setClub} users= {users} setUsers={setUsers}/>
    </header>
    <BooksContext.Provider value = {{books, setBooks}}>
    <ClubsContext.Provider value= {{clubs, setClubs}}>
    <ClubContext.Provider value= {{club, setClub}}>
    <UserContext.Provider value= {{user, setUser}}>
    <UsersContext.Provider value={{users, setUsers}}>
    <Outlet context={context}/>
    </UsersContext.Provider>
    </UserContext.Provider>
    </ClubContext.Provider>
    </ClubsContext.Provider>
    </BooksContext.Provider>
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
