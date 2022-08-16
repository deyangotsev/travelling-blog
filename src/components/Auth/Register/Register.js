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

        if (email === '') {
            toast.success(`You must add your email.`, {
                type: "error",
                autoClose: 2000,
                position: "top-center",
            });

            return;
        }

        if (password === '') {
            toast.success(`You must insert your password.`, {
                type: "error",
                autoClose: 2000,
                position: "top-center",
            })
            return;
        }

        if (rePassword === '') {
            toast.success(`Please repeat your password.`, {
                type: "error",
                autoClose: 2000,
                position: "top-center",
            })
            return;
        }

        if (password !== rePassword) {
            toast.success(`Password must match!`, {
                type: "error",
                autoClose: 2000,
                position: "top-center",
            })
        }

        else {
            try {
                firebase.register(email, password);
                toast.success(`Successful registration.`, {
                    type: "success",
                    autoClose: 2000,
                    position: "top-center",
                })
                navigate("/places")

            } catch (error) {
                toast.success(`${error}`, {
                    type: "error",
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
                backgroundImage: `url(${photo})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', position: 'relative', width: '100%', height: '100vh', color: 'white', opacity: '0.8'
            }} />
            <div className={style.loginBox}>
                <form  >
                    <div className="register-form">
                        <h1 className={style.title}>Register</h1>
                        <p className={style.placeBox}>
                            <label htmlFor="username">Email Adress</label>
                            <span className="input">
                                <i className="fas fa-user"></i>
                                <input
                                    className={style.addInput}
                                    type="email"
                                    name="userEmail"
                                    id="userEmail"
                                    value={email}
                                    onChange={(event) => onChangeHandler(event)}
                                />
                            </span>
                        </p>
                        <p className={style.imageUrlBox}>
                            <label htmlFor="password">Password</label>
                            <span className="icon">
                                <i className="fas fa-lock"></i>
                                <input
                                    className={style.addInput}
                                    type="password"
                                    name="userPassword"
                                    id="userPassword"
                                    value={password}
                                    onChange={(event) => onChangeHandler(event)}
                                />
                            </span>
                        </p>
                        <p className={style.descriptionBox}>
                            <label htmlFor="password"> Repeat Password</label>
                            <span className="input">
                                <i className="fas fa-key"></i>
                                <input className={style.addInput}
                                    type="password"
                                    name="rePassword"
                                    value={rePassword}
                                    id="rePassword"
                                    onChange={(event) => onChangeHandler(event)}
                                />
                            </span>
                        </p>

                        <Button onClick={signUp}>Register</Button>

                    </div>
                </form>
            </div>

        </>
    );
};

export default Register;
