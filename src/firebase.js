import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBFAeet5u1f__5-CCMNWDUFAp8oR--4Y5k",
  authDomain: "nba-app-c39b4.firebaseapp.com",
  databaseURL: "https://nba-app-c39b4.firebaseio.com",
  projectId: "nba-app-c39b4",
  storageBucket: "nba-app-c39b4.appspot.com",
  messagingSenderId: "149480648721"
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();

const firebaseArticles = firebaseDB.ref('articles');
const firebaseTeams = firebaseDB.ref('teams');
const firebaseVideos = firebaseDB.ref('videos');

const firebaseLooper = (snapshot) => {
  const data = [];
  snapshot.forEach(childSnapshot => {
    data.push({
      ...childSnapshot.val(),
      id: childSnapshot.key
    })
  });
  return data;
}

export {
  firebase,
  firebaseDB,
  firebaseArticles,
  firebaseVideos,
  firebaseTeams,
  firebaseLooper
};
