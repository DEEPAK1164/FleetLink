const mongoose = require('mongoose')

const connectDb = async () => {
    try { await mongoose.connect('mongodb+srv://1164dkm:{USE_YOUR_OWN_DB_CREDENTIALS}@namastenode.xfqk0.mongodb.net/FleetLink') }
    catch (err) {
        console.log(`Something went wrong while connecting database... ${err.message}`)
        throw err;
    }
}

module.exports = connectDb;
