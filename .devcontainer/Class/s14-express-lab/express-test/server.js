import express from "express";
// const express = require('express'); old version
// import axios from "axios";
import weatherRoutes from "./routes/weatherRoutes.js";
import { getWeatherfrom }from "./services/meteo-service.js";
import { WeatherError, error } from "./services/weather-error.js";

const app = express(); 
app.use(express.json()); // Middleware

// Mock In-Memory Database
const scientists = [
    { id: 1, name: "Dr. Elena Rostova", department: "Climate", projects: 4 },
    { id: 2, name: "Prof. Marcus Vance", department: "Oceanography", projects: 2 },
    { id: 3, name: "Dr. Aisha Khan", department: "Climate", projects: 7 }
];

const initiatives = [];

const protect = (req, res, next) => {
  const { token } = req.headers;
  if(!token || token !== "my-secret-token") {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}


app.get("/", (req, res) => { 
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
  const { dept } = req.query; 
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

//same endpoint, listening to the same method. 
//this method will access the info the previous get/about one gave

app.get("/about", 
  (req, res, next) => {
    req._internalMsg = "This is my WebApp class project.";
    //instead of calling next(), if res.send(`Second endpoint...) is called here, the next method will not be executed.
    next();
  }, 
  (req, res, next) => {
    res.send(`Second endpoint. ${req._internalMsg}`); 
  }
); //chaining the endpoints, i do something in a mtheod and i keep pushing forward, and someone else (another method) down the road will continue the work. This is called middleware chaining. The next() function is used to pass control to the next middleware function in the stack.

app.post("/about", (req, res) => {
  res.send('This is still my WebApp class project, but secure.');
});


app.use("/api/weather", protect, weatherRoutes); //this is the route that will handle all the weather endpoints

app.all("/{*splat}", (req, res, next) => {
  next(new Error("Endpoint not found"));
});

app.use(errorMiddleware);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});