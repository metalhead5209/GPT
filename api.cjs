const express = require('express');
const handleBars = require('express-handlebars');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const app = express();



// GPT Configuration
const { Configuration, OpenAIApi } = require('openai');
const gptKEY = process.env.API_KEY;
const ORG = process.env.ORG
const gptconfig = new Configuration({
    apiKey: gptKEY,
    organization: ORG
});
const openAiConfig = new OpenAIApi(gptconfig);


// SERPApi Configuration
const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch(key);
const imgDB = [];

// View Engine
app.engine('hbs', handleBars.engine({ extname: ".hbs" }));
app.set('view engine', 'hbs');


// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Routes
app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', async (req, res) => {
    const q = req.body.q;
    const completion = await openAiConfig.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: q }]
    });
    const message = completion.data.choices[0].message;
    console.log(message.content)
    res.render('index', { message });

});

app.post('/api', (req, res) => {
    const params = {
        q: `${req.body.results[0].name} toy`,
        tbm: "isch",
        ijn: 0,
        safe: "active",
        star: 1,
        num: 1,
    };
    console.lof(req.body.results[0].name)
    const callback = (data) => {
        const IMAGE = {
            id: Math.floor(Math.random() * 200) + 1,
            url: data["images_results"][Math.floor(Math.random() * 20)]["original"],
        };
        console.log(IMAGE);
        imgDB.push(IMAGE);
    };
    search.json(params, callback);
    res.json({
        message: "Hello There",
    });
})





app.listen(3001, () => {
    console.log("On Port 3001")
});
