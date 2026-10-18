require("dotenv").config(); // carga el archivo .env 
const express = require("express");
const https = require("https"); // nativo de node.js

const app = express();

// permite leer los datos enviados desde el html
app.use(express.urlencoded({extended: true}));

// get "/" mostrar la pagina principal
app.get("/", (req, res) => {
    res.sendFile("index.html", { root: __dirname });
});

//post "/" agarra formulario y llama a la API
app.post("/", (req, res) => {
    // agarra nombre de la ciudad
    const cityName = req.body.cityName;

    // agarra KEY_API
    const apiKey = process.env.API_KEY;
    const unit = "metric";

    // validacion de que no la dejo en blanco
    if(!cityName || cityName.trim() === ""){
        return res.send(`
            <p>Please enter a city.</p>
            <a href="/">Go back</a>
            `);
    }


// crear URL para openweathermap
const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=${unit}`;

// https.get para llamar al servicio
https.get(url, (response) => {
    let rawData = "";

    //guarda los datos que van ingresando
    response.on("data", (chunk) =>{
        rawData += chunk;
    });

    // cuando ya llegan todas las respuestas
    response.on("end", () => {
        // si la API responde con error por si no encuentra la ciudad
        if(response.statusCode !== 200){
            const errorData = JSON.parse(rawData);
            return res.send(`
                <h2>Error ${response.statusCode}</h2>
                <p>${errorData.message || "City not found"}</p>
                <a href="/">Try again</a>
                `);
        }
        // decodificacion de la respuesta del JSON
        const weatherData = JSON.parse(rawData);

        // agarra info requerida en el readme
        const temp = weatherData.main.temp; // temperatura celsius
        const description = weatherData.weather[0].description; // descripción del clima
        const icon = weatherData.weather[0].icon; // codigo del icono

        // hacemos el URL de la imagen de icono como el readme
        const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

        // enviar las respuesta al navegador
        res.setHeader("Content-Type", "text/html");
        res.write(`<h1>The temperature in ${weatherData.name} is ${temp} &deg;C</h1>`);
        res.write(`<p>The weather is currently: ${description}</p>`);
        res.write(`<img src="${iconURL}" alt="${description}">`);
        res.write(`<br><br><a href="/">Search another city</a>`);
        res.send();
    });

    }).on("error", (err) => {
        // manejo de errores 
        res.send(`
            <h2>Netword Error</h2>
            <p>${err.message}</p>
            <a href="/"> Go back </a>
            `);
    });

});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

