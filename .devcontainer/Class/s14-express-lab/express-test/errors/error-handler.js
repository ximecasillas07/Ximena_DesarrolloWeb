class WeatherError extends Error {
  constructor(message, statusCode, rootCauseClass) {
    super(message);
    this.name = "WeatherError";
    this.statusCode = statusCode;
    this.rootCauseClass = rootCauseClass;
  }
}

const errorHandler = (err, req, res, next) => {
  console.error(err);
  if (err instanceof WeatherError) {
    const msg = err.message || err.rootCauseClass || "Unknown error";
    res
      .status(err.statusCode || 500)
      .json({ error: msg, rootCause: err.rootCauseClass, section: "Weather" });
  }
  res.status(500).json({ error: err.message || "Unknown error" });
}
