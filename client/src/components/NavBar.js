import {Button} from '@mui/material'
import {NavLink} from 'react-router-dom'


function NavBar({user, setUser}){ 
    
    function handleLogout() {
        fetch('/logout', {
          method: 'DELETE'
        }).then((resp) => {
          if (resp.ok) {
            setUser(null)
          }
        })
      }
      return (
        <div>
            <Button> <NavLink to= '/home' className= 'nav-link'> Home </NavLink> </Button>
            {!user ? <Button> <NavLink to= '/login' className= 'nav-link'> Login </NavLink> </Button> : <Button> <NavLink to= '/users' className= 'nav-link'> Users </NavLink> </Button>}
            {!user ? <Button> <NavLink to= '/signup' className= 'nav-link'>Sign Up </NavLink></Button>: <Button onClick={handleLogout}>Logout</Button>}

        </div>
      )

}

export default NavBar;