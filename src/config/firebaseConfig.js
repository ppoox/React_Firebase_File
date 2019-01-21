import firebase from 'firebase';

const config = {
    /* your firebase config */
}

firebase.initializeApp(config);
const storage = firebase.storage();

export default storage;