const { realtime } = require('../config/firebaseAdmin.config.js')

const privateData_db = realtime.ref('privateData');
const publicData_db = realtime.ref('publicData');
const vacancies_db = realtime.ref('vacancies');
const messageRooms_db = realtime.ref('messageRooms');
const invoices_db = realtime.ref('invoices');



module.exports = { privateData_db, publicData_db, vacancies_db, messageRooms_db, invoices_db };