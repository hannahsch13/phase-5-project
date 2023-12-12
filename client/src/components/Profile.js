import React from "react";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";

function Profile({id, username}){ 

    return (
    <div className= 'card'>
        <h2>{username}</h2>
    </div>
    )
}

export default Profile