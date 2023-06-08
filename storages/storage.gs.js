const storage = require('../config/firebaseAdmin.config.js').storage;

const profileImagePath = 'profile_image/';
const postImagePath = 'post_image/';

const profileImage = storage.file(profileImagePath);
const postImage = storage.file(postImagePath);



module.exports = { profileImage, postImage };