const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); //for parsing application/json
app.use(cors()); //for configuring Cross-Origin Resource Sharing (CORS)
function log(req, res, next) {
    console.log(req.method + " Request at" + req.url);
    next();
}
app.use(log);

// Endpoints

// Serving login page
app.get("/OAuth/v1/auth", function (req, res) {
  fs.readFile("./api_modules/authenticate.html", "utf8", function (err, data) {
      res.writeHead(200, {
          "Content-Type":"text/html",
      });
      res.end(data);
  });
});

// Delivering tokens
app.get("/OAuth/v1/token", function (req, res) {
  import('./api_modules/OAuth.mjs')
  .then((Module) => {
    res.writeHead(200, {
        "Content-Type": "application/json",
    });
    res.end(JSON.stringify({message:Module.token()}));
  });
});

// Verifying posted passwords
app.post("/OAuth/v1/???"):

app.listen(port, () => console.log(`Server listening on port ${port}!`));
