import React, { useState } from "react";
import firebase from "../firebase/config";
import { useNavigate } from 'react-router-dom'
import style from './AddPlace.module.css'
import photo from '../images/addPlace.jpeg'
import { toast } from "react-toastify";


const AddPlace = (props) => {
  const navigate = useNavigate();

  const [place, setPlace] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');


  async function create(event) { 
    event.preventDefault();

    if (place === '') {
      toast.success(`You must fill the place's name.`, {
        type: "error",
        autoClose: 2000,
        position: "top-center",
      })
      return;
    }
    if (imageUrl == '') {
      toast.success(`You must add photo of the visited place.`, {
        type: "error",
        autoClose: 2000,
        position: "top-center",
      })
      return;
    }
    if (description.length < 10) {
      toast.success(`You must add larger description.`, {
        type: "error",
        autoClose: 2000,
        position: "top-center",
      })
      return;
    }

    try {
      await firebase.createPlace(place, imageUrl, description)
      toast.success(`Successfully added new place.`, {
        type: "success",
        autoClose: 2000,
        position: "top-center",
      })
      navigate('/places');

    } catch (error) {
      toast.success(`${error}`, {
        type: "error",
        autoClose: 2000,
        position: "top-center",
      })
    }

  }

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === 'place') {
      setPlace(value)
    }
    else if (name === 'imageUrl') {
      setImageUrl(value);
    }
    else if (name === 'description') {
      setDescription(value);
    }
  }

  return (

    <>
      
      <div style={{
        backgroundImage: `url(${photo})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', position: 'relative', width: '100%', height: '100vh', color: 'white', 
      }} />
      <div className={style.loginBox}>
        <h1 className={style.title}>Add Your New Visited Place</h1>
        <article className={style.formWrapper}>

          <form >
            <div className={style.placeBox} >
              <label htmlFor="place">Place Name</label>
              <input name="place" className={style.addInput} id="place" value={place} onChange={(event) => onChangeHandler(event)} />
            </div>
            <div className={style.imageUrlBox}>
              <label htmlFor="imageUrl">Photo</label>
              <input className={style.addInput} name="imageUrl" id="imageUrl" value={imageUrl} onChange={(event) => onChangeHandler(event)} />
            </div>
            <div className={style.descriptionBox}>
              <label htmlFor="description">Description</label>
              <textarea className={style.addInput} name="description" value={description} id="description" onChange={(event) => onChangeHandler(event)} />
            </div>
            <div>
              <span className={style.span}></span>
              <span className={style.span}></span>
              <span className={style.span}></span>
              <span className={style.span}></span>
              <button onClick={create} name="button" className={style.addBtn}
                type="primary" htmlType="submit">
                Create
              </button>
            </div>
          </form>
        </article>
      </div>
    </>

  );
};

export default AddPlace;
