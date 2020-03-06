const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const path = require('path');
const mongoConnect = require('./util/database').mongoConnect;

const app = express();



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/mycss', express.static(path.join(__dirname, 'public', 'css')));
app.use('/img', express.static(path.join(__dirname, 'public', 'images')));;
app.use('/js', express.static(path.join(__dirname, 'public', 'js')));


app.use('/admin', adminRoutes);

app.use(shopRoutes);

app.use('/', (req, res, next) => {
    console.log('This always run');
    res.send('it is me ')
    next();
});

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.ejs'));
});

// app.use(function(err, req, res, next) {
//     res.status(500).send('Something broke!');
// });
mongoConnect(() => {
    app.listen(1000)
})

// app.listen(1000, () => {
//     console.log('Your Server is running on 1000');
// })