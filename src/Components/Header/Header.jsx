import React,{useContext} from 'react';
import { Context } from '../../store/Firebasecontext';
import { Link, useNavigate } from 'react-router-dom'

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { SearchContext } from '../../store/Searchcontext';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { getAuth, signOut } from 'firebase/auth';

function Header() {

  const {setSearchValue} = useContext(SearchContext)
  const navigate = useNavigate()
  const {user} = useContext(Context)
  console.log("user :",user);


  const Logout = () =>{
    const auth = getAuth();
    Swal.fire({
      text:'Do you want to Logout',
      icon:'warning',
      showCancelButton:true,
      confirmButtonText:'Yes'
    }).then(()=>{
      signOut(auth).then(()=>{
        navigate('/login')
      })
    })
  }

  const pleaseLogin = () =>{
    Swal.fire({
      text:'Please Login to sell',
      icon:'warning'
    })
  }





  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>{user?`${user.displayName}`:<Link to='/login'><span>Login</span></Link>}</span>
          <hr />
        </div>
        {user && <button style={{ backgroundColor: '#FF0000', borderRadius: '8px', padding: '10px', border: 'none' }}
        onClick={Logout}>
          Logout
        </button>}

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            {
              user ? <Link to='/create'><span>SELL</span></Link> : <span onClick={pleaseLogin}>SELL</span>

            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
