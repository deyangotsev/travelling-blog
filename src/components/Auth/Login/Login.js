import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "../../firebase/config";
import style from "./Login.module.css";
import photo from "../../images/details.jpg";
import { toast } from "react-toastify";
import Button from "../../button/Button";

const Login = (props) => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

    const onChangeHandler = (event) => {
        const { name, value } = event.currentTarget;
        if (name === "userEmail") {
            setEmail(value);
        } else if (name === "userPassword") {
            setPassword(value);
        }
    };


    async function login(event) {
        event.preventDefault();
        try {
            await firebase.login(email, password);
            toast.success("Successful Login.", {
                type: "success",
                autoClose: 2000,
                position: "top-center",
            });
            navigate("/places");
        } catch (error) {
            toast.success(`${error}`, {
                type: "error",
                autoClose: 2000,
                position: "top-center",
            });
            navigate("/login");
        }
    }

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
            <form className={style.loginBox}>
                <legend className={style.title}>Login</legend>
                <p className={style.placeBox}>
                    <label htmlFor="username">Your Email</label>
                    <span className="input">
                        <i className="fas fa-user"></i>
                        <input
                            className={style.addInput}
                            type="email"
                            name="userEmail"
                            value={email}
                            onChange={(event) => onChangeHandler(event)}
                            id="userEmail"
                        />
                    </span>
                </p>
                <p className={style.imageUrlBox}>
                    <label htmlFor="password">Password</label>
                    <span className="input">
                        <i className="fas fa-lock"></i>
                        <input
                            className={style.addInput}
                            type="password"
                            value={password}
                            onChange={(event) => onChangeHandler(event)}
                            name="userPassword"
                            id="userPassword"
                        />
                    </span>
                </p>

                <Button onClick={login}>Login</Button>
            </form>
        </>
    );
};

export default Login;
