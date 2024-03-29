function getNavigation(isLoggedIn, appUser) {
  const authLinksUser = [
    {
      title: "Places",
      link: "/places",
    },

    {
      title: "My Places",
      link: "/my-places",
    },

    {
      title: "Add Place",
      link: "/create",
    },

    {
      title: "Logout",
      link: "/logout",
    },
  ];

  const guestLinks = [
    {
      title: "Sign In",
      link: "/login",
    },
    {
      title: "Sign Up",
      link: "/register",
    },
  ];

  return isLoggedIn ? authLinksUser : guestLinks;
}

export default getNavigation;
