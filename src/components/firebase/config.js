import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCqK7bJYtpEPYLJaiQYSzzEI5wotN12rs8",
    authDomain: "crud-project-a3b3e.firebaseapp.com",
    projectId: "crud-project-a3b3e",
    storageBucket: "crud-project-a3b3e.appspot.com",
    messagingSenderId: "985738975826",
    appId: "1:985738975826:web:59b5f7da2c9943a18e9d8b"
};

class Firebase {
    constructor() {
        firebase.initializeApp(firebaseConfig);
        this.auth = firebase.auth();
        this.db = firebase.firestore();
    }

    login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    logout() {
        return this.auth.signOut()
    }

    async register(email, password) {
        await this.auth.createUserWithEmailAndPassword(email, password)
    }

    async createPlace(place, imageUrl, description, author) {

        await this.db.collection("places").add({
            place: place,
            imageUrl: imageUrl,
            description: description,
            author: this.auth.currentUser.uid
        })
    }

    async editPlace(placeId, place, imageUrl, description) {
        await this.db.collection('places').doc(placeId).set({
            place: place,
            imageUrl: imageUrl,
            description: description
        }, { merge: true })
    }

    async deletePlace(placeId, currentUser) {
        await this.db.collection('places').doc(placeId).delete();
    }

    isInitialized() {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve)
        })
    }
    getCurrentUser() {
        return this.auth.currentUser;
    }
}

export default new Firebase();