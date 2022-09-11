const mongoose = require('mongoose');
const config = require('../config');
require('dotenv').config();

module.exports = async () => {
  const db = config.get('db');

  try {
    await mongoose.connect(
      `mongodb+srv://${db.username}:${db.pass}@chit-chit-cluster.z4cyi.mongodb.net/${db.name}?retryWrites=true&w=majority`
    );
    console.log('connection established to mongodb');
  } catch (err) {
    console.log(`error connecting to mongodb ${err.message}`, { err });
  }
};