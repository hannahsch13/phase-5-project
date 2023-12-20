import React from "react";
import { List, ListItem, ListItemText, Typography, Container, Paper, Avatar, Divider } from '@mui/material';
import { useOutletContext } from "react-router-dom"
import { deepOrange, deepPurple, teal } from '@mui/material/colors';



function ProfileList(){ 

    const {user} = useOutletContext()
    const {users}= useOutletContext()


if (user === null) {
    return <p>Login or Signup</p>;
}

const userArray = users && Object.values(users) ? Object.values(users) : [];

return (
    <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
      <Paper elevation={3} sx={{ padding: '2rem' }} style={{ backgroundColor: '#FDF0D5' }}>
        <Typography variant="h2" gutterBottom style={{ fontFamily: 'Bokor', textAlign: 'center', color: '#40531B' }}>
          Our Community! 
        </Typography>
        <List>
          {userArray.map((userData, index) =>
            userData && userData.username ? (
              <React.Fragment key={userData.id}>
                <ListItem alignItems="flex-start">
                  <Avatar sx={{ bgcolor: teal[900] }}>
                    {userData.name && userData.name.length > 0 ? userData.name[0].toUpperCase() : ''}
                  </Avatar>
                  <ListItemText
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      marginLeft: '16px',
                    }}
                  >
                    <Typography variant="subtitle1" style={{ color: '#371A37', fontFamily: 'PT Serif', fontWeight: 'bold' }}>
                      {userData.name}
                    </Typography>
                    <Typography variant="body1" style={{ color: '#371A37', fontFamily: 'PT Serif' }}>
                      {`@${userData.username} - ${userData.bookclub ? userData.bookclub.club_name : 'No Club'}`}
                    </Typography>
                  </ListItemText>
                </ListItem>
                {index < userArray.length - 1 && <Divider />}
              </React.Fragment>
            ) : null
          )}
        </List>
      </Paper>
    </Container>
  );
}

export default ProfileList;

// const userArray = Object.values(users);
// console.log(userArray)



// return (
//     <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
//       <Paper elevation={3} sx={{ padding: '2rem' }} style={{ backgroundColor: '#FDF0D5' }}>
//         <Typography variant="h2" gutterBottom style={{ fontFamily: 'Bokor', textAlign: 'center', color: '#40531B' }}>
//           Our Community! 
//         </Typography>
//         <List>
//           {userArray.map((userData) =>
//             userData && userData.username ? (
//               <ListItem key={userData.id} alignItems="flex-start">
//                 <ListItemText
//                   primary={userData.name}
//                   secondary={`@${userData.username}- ${userData.bookclub ? userData.bookclub.club_name : 'No Club'}`}
                  
//                 />
//               </ListItem>
//             ) : null
//           )}
//         </List>
//       </Paper>
//     </Container>
//   );
// };

// export default ProfileList;


