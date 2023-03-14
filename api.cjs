const express = require('express');
const handleBars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();


// View Engine
app.engine('hbs', handleBars.engine({ extname: ".hbs"}));
app.set('view engine', 'hbs');


// Middleware
app.use(express.static('public'));
app.use(express.json());



app.get('/', (req, res) => {
    res.render('index')
})


app.listen(3001, () => {
    console.log("On Port 3001")
});
