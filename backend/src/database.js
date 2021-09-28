const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/authUsers', {

    })
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));