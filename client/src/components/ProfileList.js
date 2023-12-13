import React from "react";
import { List, ListItem, ListItemText, Typography, Container, Paper } from '@mui/material';
import { useOutletContext } from "react-router-dom"



function ProfileList(){ 

    const {user} = useOutletContext()
// console.log(user)


if (user === null) {
    return <p>Login or Signup</p>;
}

const userArray = Object.values(user);
console.log(userArray)

return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '16px' }}>
        <Typography variant="h5" gutterBottom>
          Our Community! 
        </Typography>
        <List>
          {userArray.map((userData) =>
            userData && userData.username ? (
              <ListItem key={userData.id} alignItems="flex-start">
                <ListItemText
                  primary={userData.name}
                  secondary={`@${userData.username}- ${userData.bookclub ? userData.bookclub.club_name : 'No Club'}`}
                  
                />
              </ListItem>
            ) : null
          )}
        </List>
      </Paper>
    </Container>
  );
};



export default ProfileList
//     const renderUserProfiles = user.map(userData => {
//         console.log(userData.username);
// });
// if (user !== null && Array.isArray(user)) {
//     user.map(userData => {
//       console.log(userData.username);
//     });
//   } else {
//     console.error("user is null or not an array");
//   }

//     return (
//         <div className = 'container'>
//             <h1 className= 'title'> Users </h1>
//             <div> {renderUserProfiles} </div>
//         </div>
//     )    
// }