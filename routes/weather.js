const express = require("express");
const https = require('https')

const weatherRoute = express.Router();
weatherRoute.get("/", (req, res)=>{
    res.sendFile(__dirname, + "index.html")
})

weatherRoute.post("/", (req, res)=>{
    const city = req.body.cityName
    const appiKey = "f6772a5499010dbac86fa6da55e0fdaa"
    const unit = req.body.unit
        // & = &amp;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid="+appiKey+"&units="+unit+""
    https.get(url, (response)=>{
        response.on("data", (chunk)=>{
            const responseData = JSON.parse(chunk);
            const temperature = responseData.main.temp;
            const weatherDes = responseData.weather[0].description;
            const icon = responseData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/"+ icon + "@2x.png";
            const cityName = responseData.name;
            res.write(`<h1>The weather is ${temperature} degree celsius in ${cityName} and the description is ${weatherDes} </h1>`)
            res.write("<img src="+ imageURL +">")
            res.send()
        })
})
})
module.exports = weatherRoute
