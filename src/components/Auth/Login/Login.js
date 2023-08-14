import { useState } from "react";
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
      toast.success("Successful Login!", {
        autoClose: 2000,
        position: "top-center",
      });
      navigate("/places");
    } catch (error) {
      toast.error(`${error}`, {
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
        <div className={style.placeBox}>
          <label htmlFor="username">Your Email</label>

          <input
            className={style.addInput}
            type="email"
            name="userEmail"
            value={email}
            onChange={(event) => onChangeHandler(event)}
            id="userEmail"
          />
        </div>
        <div className={style.imageUrlBox}>
          <label htmlFor="password">Password</label>

          <input
            className={style.addInput}
            type="password"
            value={password}
            onChange={(event) => onChangeHandler(event)}
            name="userPassword"
            id="userPassword"
          />
        </div>

        <Button onClick={login}>Login</Button>
      </form>
    </>
  );
};

export default Login;
