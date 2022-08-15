const UserContext = React.createContext({
    isLoggedIn: false,
    appUser: null,
    logOut: () => {}
});

export default UserContext;