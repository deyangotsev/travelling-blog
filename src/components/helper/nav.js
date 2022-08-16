function getNavigation(isLoggedIn, appUser) {

    const authLinksUser = [
        {
            title: 'All Places',
            link: '/places'
        },
        {
            title: 'Add Place',
            link: '/create'
        },

        {
            title: 'Logout',
            link: '/logout'
        }
    ]

    const guestLinks = [
        {
            title: 'Places',
            link: '/places'
        },
        {
            title: 'Sign In',
            link: '/login'
        },
        {
            title: 'Sign Up',
            link: '/register'
        }
    ]

    return isLoggedIn ? authLinksUser : guestLinks;
}

export default getNavigation