
const express = require("express");
const path = require("path");
const bodyparser = require('body-parser');
const app = express();
const PORT = 3000;

/*required routers*/
const authrouter = require('./router/authrouter');
const mainrouter = require('./router/mainrouter');
const { Router } = require("express");

/**
 * Automatically parse urlencoded body content from incoming requests and place it
 * in req.body
 * https://www.npmjs.com/package/body-parser
 */
app.use(bodyparser.urlencoded({ extended: true}));

//handle authentication requests
//server recieves request to /auth/login or /auth/register, then direct to /authrouter
app.use('/auth', authrouter);


//handle all other requests
//receive request for /main/historicaldata, /main/addURL, /main/interval, /main/checknow, then direct to /mainrouter
app.use('/main', mainrouter);


// request to '/', redirect to /authrouter (same as request to /register)
app.use('/', authrouter);

//handle unknown path
app.use((req, res) => {
  res.status(404).send("Not Found");
})

//error handler
app.use((err, req, res, next) => {
const defaultErr = {
  log: "Express error handler caught unknown error",
  status: 400,
  message: { err: "an error occured"}
};

let errorObj = Object.assign(defaultErr, err);
console.log("error", errorObj.log);
  res.status(errorObj.status||500).send(errorObj.message);
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });

module.exports = app;

