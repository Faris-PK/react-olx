import React, { useContext, useEffect } from 'react';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create';
import View from './Pages/ViewPost';
import Home from './Pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Product from './store/PostContext';
import Search from './assets/Search';
import { Context } from './store/Firebasecontext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import SearchCon from './store/Searchcontext';

function App() {
  const { setUser } = useContext(Context);
  const auth = getAuth();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      if (unSubscribe) unSubscribe();
    };
  }, [setUser]);

  return (
   
    <div>
    <ToastContainer />
    <Product>
      <SearchCon>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/create' element={<Create />} />
            <Route path='/view' element={<View />} />
          </Routes>
        </Router>
      </SearchCon>
    </Product>
  </div>
   
  );
}

export default App;
