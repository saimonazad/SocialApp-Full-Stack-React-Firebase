const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from saimon!");
}); 

//getting all screams
exports.getScreams = functions.https.onRequest((req, res) => {
    admin.firestore().collection('screams').get()
        .then((data) => {
            let screams = [];
            data.forEach(doc => {
                screams.push(doc.data())
            });
            return res.json(screams);
        })
        .catch(err => console.log(err));
});

//posting new scream
exports.createScreams = functions.https.onRequest((req, res) => {
    const newScream = {
        body: req.body.body,
        userHandle: req.body.userHandle,
        createdAt: new Date().toISOString()
    };

    admin.firestore()
        .collection('screams')
        .add(newScream)
        .then(doc => {
            res.json({message: `document ${doc.id} created successfully!`});
        })
        .catch(err => {
            res.status(500).json({error: `something went wrong`});
        });
});