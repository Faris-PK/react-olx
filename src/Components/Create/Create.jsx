import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import { Context, FirebaseContext } from '../../store/Firebasecontext';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { storage } from '../../firebase/config';
import { toast } from 'react-toastify';

const Create = () => {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const { db } = useContext(FirebaseContext);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const date = new Date();

  const handleSubmit = () => {
    setLoading(true);
    if (!name.trim() || !category.trim() || !price.trim()) {
      setLoading(false);
      toast.error('All fields are required');
      return;
    }

    const storageRef = ref(storage, `images/${image.name}`);
    uploadBytes(storageRef, image)
      .then(() => getDownloadURL(storageRef))
      .then((url) => {
        return addDoc(collection(db, 'products'), {
          name,
          category,
          price,
          url,
          userId: user.uid,
          createdAt: date.toISOString().split('T')[0],
        });
      })
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <form>
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            id="fname"
            name="Price"
          />
          <br />
        </form>
        <br />
        <img
          alt="Posts"
          width="200px"
          height="200px"
          src={image ? URL.createObjectURL(image) : ''}
        />
        <br />
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
        />
        <br />
        <button onClick={handleSubmit} className="uploadBtn">
          Upload and Submit
        </button>
      </div>
    </Fragment>
  );
};

export default Create;
