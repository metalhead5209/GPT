const express = require('express');
const handleBars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();

app.engine('hbs', handleBars.engine({ extname: ".hbs"}));
app.set('view engine', 'hbs');

app.use(express.static('public'));


app.get('/', (req, res) => {
    res.render('index')
})


app.listen(3001, () => {
    console.log("On Port 3001")
});
