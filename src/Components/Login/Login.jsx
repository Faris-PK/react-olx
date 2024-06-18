import React, { useState } from 'react';
import ReactLoading from 'react-loading';
import Logo from '../../olx-logo.png';
import './Login.css';
import { useContext } from 'react';
import { FirebaseContext } from '../../store/Firebasecontext';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [loading, setLoading] = useState(false)
  const {firebase} = useContext(FirebaseContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const auth = getAuth()

  const handleSubmit = (e) =>{
    e.preventDefault()
    setLoading(true)
    console.log(email,password);
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
      setLoading(false)
        navigate('/')
    }).catch((error)=>{
      setLoading(false)
      if(error.code == 'auth/invalid-email'){
        toast.error('Invalid Email')
      }else if(error.code == 'auth/user-not-found'){
        toast.error('This user is not found')
      }else if(error.code == 'auth/invalid-credential'){
        toast.error('Invalid email or password')
      }else if(error.code == 'auth/wrong-password'){
        toast.error('wrong password')
      }else{
        toast.error("login failed try again")
      }
    })
  }


  return (
    <div>
       { loading ? <div className='loading-container'><ReactLoading  className='loading-wrapper'
                type="spinningBubbles"
                color="green"
                height={100}
                width={70}
            /></div> :
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            //defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
           //defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to={'/signup'} style={{textDecoration:'none', color:'blue'}}>New to OLX ? Signup</Link>
      </div>}
    </div>
  );
}

export default Login;
