const { realtime, storage } = require('./config/firebaseAdmin.config.js');

const publicData_db = require('./databases/realtime.rtdb.js').publicData_db;
const messageRooms_db = require('./databases/realtime.rtdb.js').messageRooms_db;
const profileImage = require('./storages/storage.gs.js').profileImage;
const postImage = require('./storages/storage.gs.js').postImage;
const messageImage = require('./storages/storage.gs.js').messageImage;

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const upload = multer({ storage: multer.memoryStorage() });


// GET /
app.get('/', (req, res) => {
    res.send('Server is running...');
});


// GET /publicData
app.get('/publicData', (req, res) => {
    publicData_db.once('value', (snapshot) => {
        const data = snapshot.val();
        res.json(data);
    }, (error) => {
        console.error(error);
        res.status(500).send('500');
    });
});


// GET /messageRooms
app.get('/messageRooms', (req, res) => {
    messageRooms_db.once('value', (snapshot) => {
        const data = snapshot.val();
        res.json(data);
    }, (error) => {
        console.error(error);
        res.status(500).send('500');
    });
});


// GET /publicData/:username
app.get('/publicData/:username', (req, res) => {
    const username = req.params.username;

    publicData_db.child(username).once('value', (snapshot) => {
        const data = snapshot.val();
        res.json(data);
    }, (error) => {
        console.error(error);
        res.status(500).send('500');
    });
});


// GET /messageRooms/:messageRoomId
app.get('/messageRooms/:messageRoomId', (req, res) => {
    const messageRoomId = req.params.messageRoomId;

    messageRooms_db.child(messageRoomId).once('value', (snapshot) => {
        const data = snapshot.val();
        res.json(data);
    }, (error) => {
        console.error(error);
        res.status(500).send('500');
    });
});


// POST /publicData/:username/jobInformation/imagesUrl
app.post('/publicData/:username/jobInformation/imagesUrl', upload.single('image'), (req, res) => {
    const { username } = req.params;
    const imageFile = req.file;
    const allowedImageTypes = ['image/jpeg', 'image/png'];

    if (!imageFile) {
        return res.status(400).send('400');
    }

    if (!allowedImageTypes.includes(imageFile.mimetype)) {
        return res.status(400).send('400');
    }

    const timestamp = Date.now();
    const imagePath = `post_image/${username}/${timestamp}-${imageFile.originalname}`;

    const fileUpload = storage.file(imagePath);
    const blobStream = fileUpload.createWriteStream({
        metadata: {
            contentType: imageFile.mimetype
        }
    });

    blobStream.on('error', (error) => {
        console.error(error);
        res.status(500).send('500');
    });

    blobStream.on('finish', () => {
        const imageUrl = `https://storage.googleapis.com/${storage.name}/${imagePath}`;

        const uid = String(timestamp);

        const newPostImage = {
            post_image_uid: uid,
            post_image_url: imageUrl
        };

        publicData_db.child(username).child('jobInformation').child('imagesUrl').child(uid).set(newPostImage)
            .then(() => {
                res.status(201).send('201');
            })
            .catch((error) => {
                console.error(error);
                res.status(500).send('500');
            });
    });

    blobStream.end(imageFile.buffer);
});


// POST /messageRooms/:roomId/messages/:username
app.post('/messageRooms/:roomId/messages/:username', upload.single('image'), (req, res) => {
    const { roomId, username } = req.params;
    const imageFile = req.file;
    const allowedImageTypes = ['image/jpeg', 'image/png'];

    if (!imageFile) {
        return res.status(400).send('400');
    }

    if (!allowedImageTypes.includes(imageFile.mimetype)) {
        return res.status(400).send('400');
    }

    const timestamp = Date.now();
    const imagePath = `message_image/${roomId}/${timestamp}-${imageFile.originalname}`;

    const fileUpload = storage.file(imagePath);
    const blobStream = fileUpload.createWriteStream({
        metadata: {
            contentType: imageFile.mimetype
        }
    });

    blobStream.on('error', (error) => {
        console.error(error);
        res.status(500).send('500');
    });

    blobStream.on('finish', () => {
        const imageUrl = `https://storage.googleapis.com/${storage.name}/${imagePath}`;

        const uid = String(timestamp);

        const newMessageImage = {
            date: timestamp,
            image_url: imageUrl,
            username: username
        };

        messageRooms_db.child(roomId).child('messages').child(uid).set(newMessageImage)
            .then(() => {
                res.status(201).send('201');
            })
            .catch((error) => {
                console.error(error);
                res.status(500).send('500');
            });
    });

    blobStream.end(imageFile.buffer);
});


// PUT /publicData/updateProfileUser/:username
app.put('/publicData/updateProfileUser/:username', upload.single('profile_image'), (req, res) => {
    const { username } = req.params;
    const profileImageFile = req.file;
    const allowedImageTypes = ['image/jpeg', 'image/png'];

    if (!profileImageFile) {
        return res.status(400).send('400');
    }

    if (!allowedImageTypes.includes(profileImageFile.mimetype)) {
        return res.status(400).send('400');
    }

    const timestamp = Date.now();
    const profileImagePath = `profile_image/${username}/${timestamp}-${profileImageFile.originalname}`;

    const fileUpload = storage.file(profileImagePath);
    const blobStream = fileUpload.createWriteStream({
        metadata: {
            contentType: profileImageFile.mimetype
        }
    });

    blobStream.on('error', (error) => {
        console.error(error);
        res.status(500).send('500');
    });

    blobStream.on('finish', () => {
        const profileImageUrl = `https://storage.googleapis.com/${storage.name}/${profileImagePath}`;

        const newData = {
            profile_image_url: profileImageUrl
        };

        publicData_db.child(username).update(newData)
            .then(() => {
                res.status(200).send('200');
            })
            .catch((error) => {
                console.error(error);
                res.status(500).send('500');
            });
    });

    blobStream.end(profileImageFile.buffer);
});



module.exports = app;