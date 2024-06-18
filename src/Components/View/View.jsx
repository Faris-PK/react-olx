import React,{useEffect,useState,useContext} from 'react';
import Header from '../Header/Header';
import { productContext } from '../../store/PostContext';

import './View.css';
import { FirebaseContext } from '../../store/Firebasecontext';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs,query,where } from 'firebase/firestore';
function View() {
  const navigate = useNavigate()
  const [userDetails,setUserDetails] = useState(null)
  const {productDetails} = useContext(productContext)
  const {db} = useContext(FirebaseContext)

  useEffect(()=>{
    if(productDetails== null){
      navigate('/')
    }
    const {userId} = productDetails
    const q = query(collection(db,'users'),where('id','==',userId))
    getDocs(q).then((snapshot)=>{
      snapshot.forEach((doc)=>{
        setUserDetails(doc.data())
      })
    })
  },[productDetails,db])

  console.log(userDetails);
  return (
    <>
    <Header/>
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={productDetails.url}
          alt=""
        />
      </div>
      {userDetails&&<div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {productDetails.price} </p>
          <span>{productDetails.name}</span>
          <p>{productDetails.category}</p>
          <span>{productDetails.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.name}</p>
          <p>{userDetails.number}</p>
        </div>
      </div>}
    </div>
    </>
  );
}
export default View;
