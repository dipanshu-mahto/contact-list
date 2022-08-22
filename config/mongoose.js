const mongoose = require('mongoose');

const db = mongoose.connection;
const uri = process.env.MONGODB_URI
mongoose.connect(uri);
db.on('error',console.error.bind(console,'error connecting to db'));

db.once('open',function(){
    console.log('succesfully connected to the database');
});

// const mongoose = require('mongoose');

// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://localhost/contact_list');
// }