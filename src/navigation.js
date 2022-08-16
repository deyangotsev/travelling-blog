import { useState, useEffect, useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home/Home'
import firebase from '../src/components/firebase/config'
import UserContext from './Context'
import Register from './components/Auth/Register/Register'
import Login from './components/Auth/Login/Login'
import Logout from './components/Auth/Logout/Logout'
import ErrorPage from './components/404/index'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

const Navigation = (props) => {
    const [firebaseInitialized, setFirebaseInitialized] = useState(false);

    useEffect(() => {
        firebase.isInitialized().then(value => {
            setFirebaseInitialized(value)
        })
    })
    const { isLoggedIn } = useContext(UserContext);

    return firebaseInitialized !== false ? (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/" />} />

                <Route path="/register" element={!isLoggedIn ? <Register /> : <Navigate to="/" />} />

                <Route path="/logout" element={isLoggedIn ? <Logout /> : <Navigate to="/login" />} />

                <Route path="*" element={<ErrorPage />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    ) : <div className='addloader' />
}

export default Navigation;