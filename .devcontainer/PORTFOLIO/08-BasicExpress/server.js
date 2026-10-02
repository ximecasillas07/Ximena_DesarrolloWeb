const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

app.post('/', (req, res) => {
    const weight = parseFloat(req.body.weight);
    const height = parseFloat(req.body.height);

    const bmi = (weight /(height * height)) * 10000;

    res.send(`Your BMI is ${bmi}`);
});

app.listen(3000, () => {
      console.log('Server is running on port 3000');
});