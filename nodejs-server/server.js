require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');


const { sequelize } = require('./utils/database');
const adminRoutes = require('./routes/admin');
const instructorRoutes = require('./routes/instructor');
const { associations } = require('./models');

const app = express();

associations();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/admin', adminRoutes);
app.use('/instructor', instructorRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    return res.status(500).send('Internal Server Error');
});


sequelize
.sync({alter: true})
.then(()=>{
    app.listen(4000, () => console.log('app is listening on port 4000!'));
})

