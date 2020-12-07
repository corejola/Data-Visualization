const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path');
const axios = require('axios')

// allow CORS
app.use(cors())

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// For Deployment
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(express.static(path.join(__dirname, "public")))

const PORT = process.env.PORT || 3001;

app.get('/search=:query', async (req, res) => {

    let stateQuery = req.params.query.toLowerCase()

    if (req.params.query === '') {
        res.send('Please provide valid query')
    } else {
        try {
            let results = await axios.get(`https://api.covidtracking.com/v1/states/${stateQuery}/current.json`)
            res.json(results.data)
        }
        catch (err) {

            res.send(err.response.data)
        }
    }
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})