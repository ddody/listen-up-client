import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDeA-zdCu_ZRYFfPArDBaNaC-ucOhu-a2A",
  authDomain: "listen-up-f55c4.firebaseapp.com",
  databaseURL: "https://listen-up-f55c4.firebaseio.com",
  projectId: "listen-up-f55c4",
  storageBucket: "listen-up-f55c4.appspot.com",
  messagingSenderId: "823208698051"
};

firebase.initializeApp(config);

export default firebase;
