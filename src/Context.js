import React from "react";
const UserContext = React.createContext({
  isLoggedIn: false,
  appUser: null,
  logOut: () => {},
});

export default UserContext;
