const mongoose = require('mongoose');
var uri = 'mongodb://localhost:27017/details'

const setup = async () => {

    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log('mongo db connect succeeded')
};
module.exports = setup;