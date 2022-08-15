import { useState, useEffect } from 'react'
import firebase from './components/firebase/config'
import UserContext from './Context'
import './App.css'


const App = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [appUser, setUser] = useState(null);

  const login = (user) => {
    setIsLoggedIn(true);
    setUser(user);
  }

  const logout = () => {
    setIsLoggedIn(false);
    setUser('');
  }

  useEffect(() => {
    firebase.auth.onAuthStateChanged(function (user) {
      if (user) {
        login(user);
      } else {
        logout();
      }
    })
  })

  return (
    <UserContext.Provider value={{ isLoggedIn, appUser, logout: logout }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default App;
