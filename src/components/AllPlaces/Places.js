import { useEffect, useState, useContext } from "react";
import firebase from "../firebase/config";
import style from "./Places.module.css";
import { Link } from "react-router-dom";


const Places = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const db = firebase.db;
    db.collection("places").onSnapshot((snapshot) => {
      setPlaces(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          place: doc.data(),
        }))
      );
    });
  }, [places]);

  return (
    <>
      <div className={style.placesBackground}>
        <div>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
          }}>
            {places.map(({ id, place }) => {
              return (
                <Link
                  to={`/details/${id}`}
                  className={style.textOverImage}
                  key={id}
                  placeId={id}
                  data-title={place.place}
                  data-text={`${place.description.substring(0, 100)}  ...`}
                >
                  <img className={style.image} src={place.imageUrl} alt="" />
                </Link>
              );
            })}
          </div>

        </div>

      </div>

    </>
  );
};
export default Places;
