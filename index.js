const express = require('express');
const helmet = require("helmet");
const app = express();

app.use(helmet());

app.get('/', function (_req, res) {
    res.send('Imgsharp - a high performing Node.js Image Processing Service.')
})

app.listen(3000)