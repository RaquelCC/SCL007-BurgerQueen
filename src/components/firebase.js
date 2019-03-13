import * as firebase from 'firebase';


const config = {
    apiKey: "AIzaSyALTdVlH8chi4b9C_5Y0xh2kisidpWZvl0",
    authDomain: "burger-queen-53b76.firebaseapp.com",
    databaseURL: "https://burger-queen-53b76.firebaseio.com",
    projectId: "burger-queen-53b76",
    storageBucket: "burger-queen-53b76.appspot.com",
    messagingSenderId: "358952571365"
};

firebase.initializeApp(config);

export const pedidosRef = firebase.database().ref();
