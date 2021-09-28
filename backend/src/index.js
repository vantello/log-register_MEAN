const express = require('express');
const app = express();
const cors = require('cors');

require('./database');

app.use(cors());
app.use(express.json()); //converteix dadesd e server en objecte javascript.


app.use('/api', require('./routes/index.js'));

app.listen(3000);
console.log('server on port', 3000);