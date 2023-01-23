const {Pool} = require('pg');

const pool = new Pool({connectionString:process.env.URI});


const connectDB = async function(){
    try {
        await pool.connect();
        console.log('Successfully connected to the Database.');
    } catch (error) {
        console.log('Error in connecting to the database .',error);
    }
}

module.exports = {pool,connectDB};