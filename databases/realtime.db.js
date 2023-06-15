const { realtime } = require('../config/firebaseAdmin.config.js')

const privateData_db = realtime.ref('privateData');
const publicData_db = realtime.ref('publicData');
const messageRooms_db = realtime.ref('messageRoomList');
const vacancies_db = realtime.ref('vacanciesList');



module.exports = { privateData_db, publicData_db, messageRooms_db, vacancies_db };