require('dotenv').config();

const app = require('./express');


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
}).on('error', (err) => {
    console.log(`Server Error: ${err}`);
});