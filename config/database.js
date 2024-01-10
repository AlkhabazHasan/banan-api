const mongoose = require('mongoose');

// Removes the warning with promises 
mongoose.Promise = global.Promise;

// Connect the db with the url provided 
try {
  mongoose.connect(process.env.MONGO_URL);
} catch (error) {
  handleError(error);
}

mongoose.connection.once('open', () => console.log('MongoDB Running'));
