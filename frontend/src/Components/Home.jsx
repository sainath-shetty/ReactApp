import React from 'react'
import {Link} from 'react-router-dom'
const Home = () => {
  return (
    <div>
      HOME
     <Link to='/signup'> <button>Signup</button></Link>
     <Link to='/login'><button>Login</button></Link>
    </div>
  
  )
}

export default Home
