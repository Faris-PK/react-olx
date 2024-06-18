import React, { useContext, useEffect, useState } from 'react';

import Heart from '../../assets/Heart';
import './Posts.css';
import { FirebaseContext } from '../../store/Firebasecontext';
import { productContext } from '../../store/PostContext';
import { SearchContext } from '../../store/Searchcontext';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';

function Posts() {
  const {db} = useContext(FirebaseContext)
  const [products, setProducts] = useState([])
  const {setProductDetails} = useContext(productContext)
  const {searchValue, setSearchValue} = useContext(SearchContext)

  const navigate = useNavigate()

  useEffect(() =>{
    const collectionRef = collection (db, 'products')
    getDocs(collectionRef).then((snapshot) =>{
      const allProducts = snapshot.docs.map((value) =>{
        return{
          ...value.data(),
          id:value.id
        }
      })
      setProducts(allProducts)
    })
  },[db])

  const handleClick = (product) =>{
    setProductDetails(product)
    navigate('/view')
  }

  const val = searchValue.toLowerCase()
  const fiterProducts = products.filter((product) => {
    const productName = product.name.toLowerCase()
    const searchValue = val.toLowerCase()
    const regex = new RegExp(`^${searchValue}|.*${searchValue}.*`);
    return regex.test(productName)
  })

  let pro = fiterProducts !='' ? fiterProducts:products

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
        {
      pro.map((product)=>{
        return(
          <div className="card" onClick={()=> handleClick(product)}>
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.name}</span>
              <p className="name"> {product.category}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div>
          )
        })
      }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">

    <div className="card">
        <div className="favorite">
          <Heart></Heart>
        </div>
        <div className="image">
          <img src="../../../Images/R15V3.jpg" alt="" />
        </div>
        <div className="content">
          <p className="rate">&#x20B9; 250000</p>
          <span className="kilometer">Two Wheeler</span>
          <p className="name"> YAMAHA R15V3</p>
        </div>
        <div className="date">
          <span>10/5/2021</span>
        </div>
      </div>

        
        </div>
      </div>
    </div>
  );
}

export default Posts;
