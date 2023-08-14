import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import UserContext from "./Context";
import Places from "./components/AllPlaces/Places";
import Register from "./components/Auth/Register/Register";
import Login from "./components/Auth/Login/Login";
import Logout from "./components/Auth/Logout/Logout";
import Details from "./components/AllPlaces/Details";
import AddPlace from "./components/AllPlaces/AddPlace";
import EditPlace from "./components/AllPlaces/EditPlace";
import ErrorPage from "./components/404/index";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MyPosts from "./components/AllPlaces/MyPosts";

const Navigation = (props) => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={!isLoggedIn ? <Login /> : <Navigate to="/" />}
        />

        <Route
          path="/register"
          element={!isLoggedIn ? <Register /> : <Navigate to="/" />}
        />

        <Route
          path="/logout"
          element={isLoggedIn ? <Logout /> : <Navigate to="/login" />}
        />

        <Route
          path="/places"
          element={isLoggedIn ? <Places /> : <Navigate to="/login" />}
        />

        <Route
          path="/my-places"
          element={isLoggedIn ? <MyPosts /> : <Navigate to="/login" />}
        />

        <Route path="/details/:placeId" element={<Details />} />

        <Route
          path="/create"
          element={isLoggedIn ? <AddPlace /> : <Navigate to="/login" />}
        />

        <Route
          path="/edit/:placeId"
          element={isLoggedIn ? <EditPlace /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Navigation;
