import style from "./Home.module.css";
import travellvideo from "./Video/video.mp4";
import "animate.css";

const Home = () => {
  return (
    <div className={style.container}>
      <div className={style.textContainer}>
        <h1 className="animate__animated animate__fadeInUp">
          Welcome to our travelling blog!
        </h1>
        <p className="animate__animated animate__fadeInUp">
          Here you will find suggestions for tourist attractions to visit when
          you travel.
        </p>
        <p
          className="animate__animated animate__fadeInUp"
          style={{ textAlign: "center" }}
        >
          You can also add your own!
        </p>
      </div>

      <video
        src={travellvideo}
        type="video/mp4"
        autoPlay
        loop
        muted
        className={style.video}
      />
    </div>
  );
};

export default Home;
