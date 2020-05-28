import firebase from 'firebase/app';
import 'firebase/database';

var config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

firebase.initializeApp(config);

const db = firebase.database();

const getImageUrl = (startAt) => {

    return new Promise(resolve => {
        // remove data listener
        db.ref('images').off();
        db.ref('images').orderByKey().startAt(startAt.toString()).limitToFirst(4).once('value')
            .then(function (snapshot) {
                if (snapshot.val() != null) {
                    resolve(Object.values(snapshot.val()));
                } else {
                    resolve(snapshot.val());
                }
            })
    })
}

export {
    db,
    getImageUrl
};