import style from "./Button.module.css";

const Button = ({ onClick, children }) => {
  return (
    <button className={style.Btn} type="submit" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
