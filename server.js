const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;

//Set up express app 
const app = express();



//Set up express app for parsing data
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//express static middle ware
app.use(express.static('public'))

require('./routes/htmlRoutes.js')(app);
require('./routes/apiRoutes.js')(app);

app.listen(PORT, ()=> {
    console.log(`Server listening on PORT ${PORT}`);
})
