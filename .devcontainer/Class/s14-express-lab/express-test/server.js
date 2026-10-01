import express from "express";
// const express = require('express'); old version
// import axios from "axios";
import { getWeatherfrom }from "./services/meteo-service.js";


const app = express(); //when we call express we get an application
app.use(express.json()); // Middleware, change the behaviour of the server; configure express server that whenever it recieves info to interpret it as a json
//when you configure a server, it will get executed from top to bottom. Anything declared before this will not be prepared to handle json

// Mock In-Memory Database
const scientists = [
    { id: 1, name: "Dr. Elena Rostova", department: "Climate", projects: 4 },
    { id: 2, name: "Prof. Marcus Vance", department: "Oceanography", projects: 2 },
    { id: 3, name: "Dr. Aisha Khan", department: "Climate", projects: 7 }
];

const initiatives = [];

app.get("/", (req, res) => { //this callback func will alaways recieve two varaible: request and response
  res.send(`
        <div style="font-family: sans-serif; padding: 20px;">
            <h1> SustainHub Decoupled REST API</h1>
            <p>Status: <span style="color: green; font-weight: bold;">ONLINE</span></p>
            <p>Available JSON endpoints: <code>/api/scientists</code>, <code>/api/initiatives</code></p>
        </div>
    `);
});


//http://localhost:port/greet?name=Valeria&city=Guadalajara
app.get("/greet", (req, res) => {
  const { name, city } = req.query;
  res.send(`Hello ${name}, how is the weather in ${city}`);
});

// /api/scientists?dept=***
app.get("/api/scientists", (req, res) => {
  const { dept } = req.query; // this way of getting info is called destructuring
  if(dept) {
    const result = scientists.filter(
      (scientist) => scientist.department.toLowerCase() === dept.toLowerCase(), 
    );
    if(result && result.length > 0){
      return res.json({
        deptScientists: result,
        dept, 
        count: result.length,
      });
    } else {
      return res.json({ errorMsg:  `No results for the department ${dept}`, dept });
    }
  }
  res.json({ deptScientists: scientists, count: scientists.length });
});

// /api/scientists/:id
app.get("/api/scientists/:id/profile/:keyword", (req, res) => {
  const scientistId = parseInt(req.params.id, 10);
  const { keyword } = req.params;
  const scientist = scientists.find((s) => s.id === scientistId);
  if(!scientist){
    return res.json({ success: false, errorMsg: "No scientist found." });
  }
  res.json({
    success: true, 
    data: scientist,
    keyword,
  });
});

app.get("/api/initiatives", (req, res) => {
  res.json({ initiatives, status: "Ok" });
});

app.post("/api/initiatives", (req, res) => {
  const { title, budget, department } = req.body;
  const initiative = { title, budget, department };
  initiatives.push(initiative);
  res.json({ title, budget, department, status: "Ok" });
});


app.get("/about", (req, res) => {
  res.send('This is my WebApp class project.');
});

app.post("/about", (req, res) => {
  res.send('This is still my WebApp class project, but secure.');
});

app.get("/weatherGDL", async (req, res) => {
  const respString = await getWeatherfrom(20.6597, -103.349, "Guadalajara");
  res.send(respString);
  /* before meteo-service.js: 
  const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=20.6597&longitude=-103.349&current_weather=true";
  const response = await axios(apiUrl);
  const currentWeather = response.data;
  console.log(currentWeather); 
  res.send(`In Guadalajara, the current temps is ${currentWeather.current_weather.temperature} C`); */

});

app.get("/weatherLSN", async (req, res) => {
  const respString = await getWeatherfrom(46.52, 6.63, "Lausanne");
  res.send(respString);

});

        //which is the port that this server will be listening to 
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000'); //port 3000
});
