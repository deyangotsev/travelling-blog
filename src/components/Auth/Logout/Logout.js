import React from "react";
import { useNavigate } from "react-router-dom";
import firebase from "../../firebase/config";
import style from './Logout.module.css';
import image from '../../images/logout.jpeg';
import { toast } from "react-toastify";
import 'animate.css';


const SignOut = () => {
    const navigate = useNavigate();

    async function Logout(event) {

        event.preventDefault();

        try {
            await firebase.logout();
            toast.success('Successful Logout.', {
                autoClose: 2000,
                position: "top-center",
            })
            navigate("/");
        } catch (error) {
            toast.error(`${error}`, {
                autoClose: 2000,
                position: "top-center",
            })
            navigate("/login");
        }
    }
    return (
        <div>

            <div className={style.logoutWrapper}>
                <div
                    style={{
                        backgroundImage: `url(${image})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        position: 'relative',
                        width: '100%',
                        height: '100vh',
                        color: 'white',
                    }} />

                <h2 className={style.logoutHeader}
                    style={
                        {
                            animation: 'backInDown',
                            animationDuration: '1s',
                        }
                    }
                >Are you sure you want to log out?</h2>


                <button
                    className={style.logoutBtn}
                    style={
                        {
                            animation: 'shakeX',
                            animationDuration: '5s',
                        }
                    }

                    onClick={Logout}>Click here to logout</button>


            </div>
        </div>
    );
};

export default SignOut;
