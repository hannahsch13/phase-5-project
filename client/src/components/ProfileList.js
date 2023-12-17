import React from "react";
import { List, ListItem, ListItemText, Typography, Container, Paper } from '@mui/material';
import { useOutletContext } from "react-router-dom"



function ProfileList(){ 

    const {user} = useOutletContext()
    const {users}= useOutletContext()


if (user === null) {
    return <p>Login or Signup</p>;
}

const userArray = Object.values(users);
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
