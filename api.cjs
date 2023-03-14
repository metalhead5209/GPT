const express = require('express');
const handleBars = require('express-handlebars');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');
const app = express();

// GPT Configuration
const KEY = process.env.API_KEY;
const ORG = process.env.ORG
const gptconfig = new Configuration({
    apiKey: KEY,
    organization: ORG
});
const openAiConfig = new OpenAIApi(gptconfig);


// View Engine
app.engine('hbs', handleBars.engine({ extname: ".hbs"}));
app.set('view engine', 'hbs');


// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false}));


// Routes
app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', async (req, res) => {
    const q = req.body.q;
    const completion = await openAiConfig.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: q}]
    });
    const message = completion.data.choices[0].message;
    console.log(message);
    res.render('index', { message })
})





app.listen(3001, () => {
    console.log("On Port 3001")
});
