import React, { useEffect, useState, createContext} from "react";
import {Outlet} from "react-router-dom"
// import { Switch, Route } from "react-router-dom";
import {Button} from "@mui/material";

// import index from './styling/index.css';
import Signup from "./Signup";
import NavBar from "./NavBar";
import Homepage from "./Homepage";
import { create } from "@mui/material/styles/createTransitions";


export const UserContext = createContext();
export const ClubContext = createContext();
export const UsersContext = createContext();
export const ClubsContext = createContext();
export const ClubBooksContext = createContext();
export const CurrentClubContext = createContext();
export const BooksContext = createContext();

function App() {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState(null)
  const [club, setClub] = useState('')
  const [clubs, setClubs] = useState('')
  const [clubBooks, setClubBooks] = useState('')
  const [currentClub, setCurrentClub] = useState('')
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



 

  console.log(user)




  const context = {
    user, 
    setUser,
    club,
    setClub,
    users,
    setUsers,
    clubs, 
    setClubs,
    clubBooks,
    setClubBooks,
    currentClub,
    setCurrentClub,
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
      <NavBar user={user} setUser={setUser} club={club} setClub={setClub} users= {users} setUsers={setUsers} clubBooks={clubBooks} setClubBooks= {setClubBooks}/>
    </header>
    <BooksContext.Provider value ={{books, setBooks}}>
    <CurrentClubContext.Provider value = {{currentClub, setCurrentClub}}>
    <ClubBooksContext.Provider value = {{clubBooks, setClubBooks}}>
    <ClubsContext.Provider value= {{clubs, setClubs}}>
    <ClubContext.Provider value= {{club, setClub}}>
    <UserContext.Provider value= {{user, setUser}}>
    <UsersContext.Provider value={{users, setUsers}}>
    <Outlet context={context}/>
    </UsersContext.Provider>
    </UserContext.Provider>
    </ClubContext.Provider>
    </ClubsContext.Provider>
    </ClubBooksContext.Provider>
    </CurrentClubContext.Provider>
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
