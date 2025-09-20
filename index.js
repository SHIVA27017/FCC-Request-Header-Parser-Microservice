// index.js
// where your node app starts

// init project
// require("dotenv").config();
// var express = require("express");
// var cors = require("cors");
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC

app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.get("/api/whoami", (request, response) => {
  try {
    console.log(`ipaddress: ${request.ip}`);
    console.log(`software: ${request.headers["user-agent"]}`);
    console.log(`lanquage: ${request.headers["accept-language"]}`);
    return response.json({
      ipaddress: request.ip,
      language: request.headers["accept-language"],
      software: request.headers["user-agent"],
    });
  } catch (error) {
    console.log(error.message);
    return response.status(500).json("Internal server error!");
  }
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

/*

Common HTTP request headers with client data:

User-Agent: Identifies the client's software, such as the web browser and operating system, which helps the server optimize content for different platforms.

Accept: Specifies the types of media, such as text/html or application/json, that the client is able to process. The server uses this for content negotiation.

Accept-Language: Indicates the client's preferred human language, so the server can send a response in the correct language.

Authorization: Contains authentication credentials, such as a username and password or a bearer token, for accessing protected resources.

Cookie: Sends cookies that were previously stored by the server to maintain session state and remember user preferences.

Host: Specifies the domain name of the server and the port number of the requested resource.

Referer: Indicates the URL of the previous web page from which the current request was made.

Origin: Used in cross-origin resource sharing (CORS) to indicate the origin of the request. 

*/
