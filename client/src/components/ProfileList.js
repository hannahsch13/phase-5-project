import React from "react";
import { useOutletContext } from "react-router-dom"



function ProfileList(){ 

    const {user} = useOutletContext()
// console.log(user)


if (user === null) {
    return <p>Login or Signup</p>;
}

const userArray = Object.values(user);

return (
    <div>
      {userArray.map((userData) => (
        userData && userData.username ? (
          <p key={userData.id}>{userData.username}</p>
        ) : null
    ))}
    </div>
  );
}

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