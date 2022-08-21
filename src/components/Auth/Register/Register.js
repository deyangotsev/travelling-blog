import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import firebase from "../../firebase/config";
import style from './Register.module.css'
import photo from '../../images/details.jpg'
import { toast } from "react-toastify";
import Button from "../../button/Button";


const Register = (props) => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");


    const onChangeHandler = (event) => {
        const { name, value } = event.currentTarget;

        if (name === "userEmail") {
            setEmail(value);
        } else if (name === "userPassword") {
            setPassword(value);
        } else if (name === "rePassword") {
            setRePassword(value);
        }
    };

    const signUp = (event) => {
        event.preventDefault();

        if (email === '' || password === '' || rePassword === '') {
            toast.error(`You need to fill all the fields!`, {
                autoClose: 2000,
                position: "top-center",
            });

            return;
        }

        if (password.length < 6) {
            toast.error(`Password must be at least 6 characters!`, {
                autoClose: 2000,
                position: "top-center",
            });

            return;
        }


        if (password !== rePassword) {
            toast.error(`Password must match!`, {
                autoClose: 2000,
                position: "top-center",
            })
        }

        else {
            try {
                firebase.register(email, password);
                toast.success(`Successful registration.`, {
                    autoClose: 2000,
                    position: "top-center",
                })
                navigate("/places")

            } catch (error) {
                toast.error(`${error}`, {
                    autoClose: 2000,
                    position: "top-center",
                })
                navigate("/register");
            }
        }


    };

    return (
        <>

            <div style={{
                backgroundImage: `url(${photo})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                position: 'relative',
                width: '100%',
                height: '100vh',
                color: 'white',
                opacity: '0.8'
            }} />



            <div className={style.loginBox}>
                <form  >
                    <div className="register-form">
                        <h1 className={style.title}>Register</h1>
                        <div className={style.placeBox}>
                            <label htmlFor="username">Email Adress</label>

                            <input
                                className={style.addInput}
                                type="email"
                                name="userEmail"
                                id="userEmail"
                                value={email}
                                onChange={(event) => onChangeHandler(event)}
                            />

                        </div>
                        <div className={style.imageUrlBox}>
                            <label htmlFor="password">Password</label>

                            <input
                                className={style.addInput}
                                type="password"
                                name="userPassword"
                                id="userPassword"
                                value={password}
                                onChange={(event) => onChangeHandler(event)}
                            />

                        </div>
                        <div className={style.descriptionBox}>
                            <label htmlFor="password"> Repeat Password</label>


                            <input className={style.addInput}
                                type="password"
                                name="rePassword"
                                value={rePassword}
                                id="rePassword"
                                onChange={(event) => onChangeHandler(event)}
                            />

                        </div>

                        <Button onClick={signUp}>Register</Button>

                    </div>
                </form>
            </div>

        </>
    );
};

export default Register;
