const express = require('express');
const firebase = require('firebase');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



const firebaseConfig = {
  apiKey: "AIzaSyBYlamgKspE-TV9wnhwZFqyvfpee_D2JBg",
  authDomain: "mybook-f1164.firebaseapp.com",
  projectId: "mybook-f1164",
  storageBucket: "mybook-f1164.appspot.com",
  messagingSenderId: "619024847789",
  appId: "1:619024847789:web:48d0111e7500fe8b0fc724",
  measurementId: "G-JT498H0R5W"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const User = db.collection("Users");

app.post('/api/data', async (req, res) => {
  try {
    const { bname, aname,gname,about, plink, ilink } = req.body;

    User.add({
      aname: aname,
      bname: bname,
      gname:gname,
      about:about,
      plink: plink,
      ilink: ilink
    })

    console.log('User added to Firestore database!');
  } catch (error) {
    console.error(error);
    console.log('Error adding user to Firestore database');
  }
});

app.get('/api/content', async (req, res) => {
  try {
    const usersSnapshot = await User.get();
    const users = [];
    usersSnapshot.forEach(doc => {
      users.push({ id: doc.id, ...doc.data() });
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching users from Firestore database');
  }
});

app.listen(5000, () => console.log("running on port 5000"));

