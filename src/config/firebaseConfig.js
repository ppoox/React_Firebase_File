import firebase from 'firebase';

const config = {

}

firebase.initializeApp(config);
const storage = firebase.storage();

export default storage;