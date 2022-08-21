import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import firebase from "../firebase/config";
import style from "./Edit.module.css";
import photo from "../images/details.jpg";
import { toast } from "react-toastify";

const EditPlace = (props) => {
  const navigate = useNavigate();

  const [place, setPlace] = useState('');

  const params = useParams();

  async function edit(event) {

    event.preventDefault();

    if (place.place === "") {
      toast.error(`You must fill the place's name.`, {
       
        autoClose: 2000,
        position: "top-center",
      });
      return;
    }

    if (place.imageUrl === "") {
      toast.error(`You must add photo of the visited place.`, {
        autoClose: 2000,
        position: "top-center",
      });
      return;
    }

    if (place.description === "") {
      toast.error(`You must add larger description.`, {
        autoClose: 2000,
        position: "top-center",
      });
      return;
    }

    try {
      await firebase.editPlace(
        place.id,
        place.place,
        place.imageUrl,
        place.description
      );

      toast.success(`Successfully edited the place.`, {
        autoClose: 2000,
        position: "top-center",
      });

      navigate(`/details/${place.id}`);


    } catch (error) {
      toast.error(`${error}`, {
        autoClose: 2000,
        position: "top-center",
      });
    }
  }

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "place") {
      setPlace({ ...place, place: value });
    } else if (name === "imageUrl") {
      setPlace({ ...place, imageUrl: value });
    } else if (name === "description") {
      setPlace({ ...place, description: value });
    }
  };

  const getData = useCallback(async () => {
    const id = params.placeId;
    const db = firebase.db;

    await db
      .collection("places")
      .doc(id)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setPlace({ ...doc.data(), id: doc.id });
        } else {
          props.navigate("/places");
        }
      });
  }, [params.placeid, props.navigate]);


  useEffect(() => {
    getData();
  }, [getData]);


 
  return (
    <>
      
      <div
        style={{
          backgroundImage: `url(${photo})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: "relative",
          width: "100%",
          height: "100vh",
          color: "white",
          opacity: "0.8",
        }}
      />

      <div className={style.loginBox}>

        <h1 className={style.title}>
          Edit Your Visited Place
        </h1>

        <article>

          <form>
            <div className={style.placeBox}>
              <label htmlFor="place">Name</label>
              <input
                className={style.addInput}
                id="place"
                name="place"
                type="text"
                value={place.place}
                onChange={(event) => onChangeHandler(event)}   
              />
            </div>


            <div  className={style.imageUrlBox}>
              <label htmlFor="photo">Photo</label>
              <input
                className={style.addInput}
                type="text"
                name="imageUrl"
                value={place.imageUrl}
                id="photo"
                onChange={(event) => onChangeHandler(event)}
              />
            </div>


            <div  className={style.descriptionBox}>
              <label htmlFor="description">Description</label>
              <textarea
                className={style.addInput}
                type="text"
                name="description"
                id="description"
                value={place.description}
                onChange={(event) => onChangeHandler(event)}
              />
            </div>


            <div>
              <button
                className={style.editBtn}
                onClick={edit} 
                name="button"
                type="primary"
                htmlType="submit"
              >
                Edit
              </button>
            </div>

            
          </form>
        </article>
      </div>
     
    </>
  );
};

export default EditPlace;
