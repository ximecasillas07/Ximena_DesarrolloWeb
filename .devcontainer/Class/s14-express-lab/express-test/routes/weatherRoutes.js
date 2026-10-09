import express from "express";

const router = express.Router();

const cities = {
  GDL: { lat: 20.6597, long: -103.349 },
  LSN: { lat: 46.52, long: 6.63 },
};

// http://localhost:3000/api/weather/weatherGDL
router.get("/weatherGDL", async (req, res, next) => {
    const respString = await getWeatherfrom(20.6597, -103.349, "Guadalajara");
    res.send(respString);
});

router.get("/weatherLSN", async (req, res, next) => {
    const respString = await getWeatherfrom(46.52, 6.63, "Lausanne");
    res.send(respString);
});

router.get("/weather/:city", async (req, res, next) => {
    const { city } = req.params;
    if(!city) 
      next(new WeatherError("City code is required", 400, "/weather/:city"));
    if(!cities[city])
        next(new WeatherError("City code is not valid", 400, "/weather/:city"));
    const { lat, long, name } = cities[city];
    const respString = await getWeatherfrom(lat, long, name);
    res.send(respString);
});
    


export default router;