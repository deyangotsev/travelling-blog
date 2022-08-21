import { useContext, useEffect, useState, useCallback } from "react";
import firebase from "../firebase/config";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import UserContext from '../../Context'
import style from './Details.module.css'


const Details = (props) => {
  const [place, setPlace] = useState("");
  const params = useParams();

  const navigate = useNavigate()
  const {  appUser } = useContext(UserContext);

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
  }, [params.placeId, props.navigate]);



  async function deletePlace(event) {
    event.preventDefault();

    let checkConfirmation = window.confirm('Are you sure you want to delete your post?');

    if (checkConfirmation) {
      await firebase.deletePlace(place.id, appUser.uid);
      navigate('/places');
    }
  }



  useEffect(() => {
    getData();
  }, [getData]);


  const isAuthor = appUser.uid === place.author;

  return (
    <>

      <div className={style.detailsPage}>
        <h1 className={style.heading}>{place.place}</h1>
        <img className={style.imageUrl} src={place.imageUrl} alt="" />
        <h3 className={style.descriptionn}>{place.description}</h3>
        <div className={style.actions}>
          {isAuthor ? (<> <button className={style.deleteBtn} onClick={deletePlace}>Delete</button>
            <button className={style.editBtn}><Link to={`/edit/${place.id}`}>Edit </Link></button> </>) : null}

        </div>
      </div>

    </>
  );
};

export default Details;
