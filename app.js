const express = require("express");
const path = require("path");

const multiplyRoute = require("./routes/multiply");
const debugRoute = require("./routes/debug");
const interpretRoute = require("./routes/interpret");
const chainRoute = require("./routes/chain");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/mam/multiply", multiplyRoute);
app.use("/mam/debug", debugRoute);
app.use("/mam/interpret", interpretRoute);
app.use("/mam/chain", chainRoute);

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.get("/", (req, res) => {
  res.redirect("/simulator.html");
});

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res.status(400).json({
      error: "Request body contains invalid JSON.",
    });
  }

  return next(error);
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`M.A.M. API listening on port ${port}`);
  });
}

module.exports = app;
