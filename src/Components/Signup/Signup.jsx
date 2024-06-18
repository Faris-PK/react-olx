import React, { useContext, useState } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import ReactLoading from 'react-loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FirebaseContext } from '../../store/Firebasecontext';
import {getAuth, createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import {addDoc, collection} from 'firebase/firestore'
import { db } from '../../firebase/config';

import {Link, useNavigate} from 'react-router-dom'

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const auth = getAuth()
  const navigate = useNavigate()
  const {firebase} = useContext(FirebaseContext)
  //console.log("firebase :",firebase);
  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log(username, email, phone, password);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!username.trim()||!email.trim()||!password.trim()||!phone.trim()){
      setLoading(false)
      toast.error('All fields are required')
      return false
    }else if(phone.length < 10){
      setLoading(false)
      toast.error('number must be 10 digits')
      return false
    }else if(!emailRegex.test(email)){
      setLoading(false)
      toast.error('Please enter a valid email address');
      return false;
    }
    else if(!emailRegex.test(email)){
      setLoading(false)
      toast.error('Please enter a valid email address');
      return false;
    }
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
      const user = userCredential.user;
      return updateProfile(user, {
        displayName: username
      });    
    }).then(()=>{
      addDoc(collection(db,'users'),{
        id:auth.currentUser.uid,
        name :username,
        phone:phone
      })
    }).then(()=>{
        navigate('/login')
    }).catch((error)=>{
        if(error.code == 'auth/email-already-in-use'){
          toast.error('Email already in use')
        }else{
           toast.error('server under maintainence')
        }
      })

    
    
   
    
  };

  return (
    <div>
      <ToastContainer/>
      {loading?     
       <div className='loading-container'>
      <ReactLoading  className='loading-wrapper'
       type="spinningBubbles"
       color="green"
       height={100}
       width={70}
   /></div>
        :
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="OLX Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            name="username"
            placeholder="Enter your username"
            required
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            placeholder="Enter your email"
            required
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            required
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            placeholder="Enter your password"
            required
          />
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <Link to={'/login'} style={{textDecoration:'none', color:'blue'}}>Already in use ? Login</Link>
      </div>}
    </div>
  );
}
