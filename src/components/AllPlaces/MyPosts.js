import { useEffect, useState, useContext } from "react";
import firebase from "../firebase/config";
import style from "./MyPosts.module.css";
import { Link } from "react-router-dom";
import UserContext from "../../Context";


const Places = () => {
    const [places, setPlaces] = useState([]);
    const { appUser } = useContext(UserContext);

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

    const myPlaces = places.filter(x => x.place.author === appUser.uid);



    return (
        <>
            <div className={style.placesBackground}>
                <div>

                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                    }}>
                        {myPlaces.length > 0 ?
                            myPlaces.map(({ id, place }) => {
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
                            })
                            : <h1 className={style.noPosts}>You haven't posted yet!</h1>}
                    </div>

                </div>

            </div>

        </>
    );
};
export default Places;
