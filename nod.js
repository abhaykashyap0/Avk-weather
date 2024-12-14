const http=require('http');
const requests=require("requests");
const  prompt=require('prompt-sync')();

const  query=require("querystring");
const fs =require("fs");
const path=require("path");
let htm=fs.readFileSync('index.html',"utf8");
let ind=fs.readFileSync('we.html',"utf8");
const port=process.env.PORT || 3000;
// let  cod=document.getElementById("inn");

// let {JSDOM}=jsdom;
// const { JSDOM } = require("jsdom");
// const dom=new JSDOM(ind);
// const document = dom.window.document;
// let lc=document.getElementById("in").value;
// console.log(lc);
// let loc=prompt('Enter your location');
const replacerval = (value,real)=>{
    let temp = (real.main.temp - 273.00).toFixed(2);
    let min = (real.main.temp_min - 273.00).toFixed(2);
        let max= (real.main.temp_max - 273.00).toFixed(2);
        let feels= (real.main.feels_like - 273.00).toFixed(2);
    let  temperature=value.replace("{%tempm%}",temp);
    // let  temperature=value.replace("{%tempm%}",real.main.temp-273.00);
    temperature=temperature.replace("{%maxtemp%}",min);
    temperature=temperature.replace("{%feel%}",feels);
    temperature=temperature.replace("{%mintemp%}",max);
    temperature=temperature.replace("{%location%}",real.name);
    temperature=temperature.replace("{%country%}",real.sys.country);
    temperature=temperature.replace("{%hum%}",real.main.humidity);
    temperature=temperature.replace("{%meter%}",real.visibility);
    temperature=temperature.replace("{%wind%}",real.wind.speed);
    temperature=temperature.replace("{%sta%}",real.weather[0].main);

     return temperature;
};

const server=http.createServer((req, res)=>{
    // res.write(htm);
    // let loc=prompt('Enter your location');
    // res.end();
    // if(req.url=="/"){
    //     res.write(ind);
    //     res.end();
    // }
    if( req.url==="/abhay"){
    let body='';
    let lc;
    req.on("data",chunk =>{

        body+=chunk.toString();
    });
    req.on('end',()=>{
        const bod=query.parse(body);
        lc=bod.loc||"kanpur";
    
 
    requests(`https://api.openweathermap.org/data/2.5/weather?q=${lc}&appid=1854745bde5d050f1f646f7c986ef087`)
    .on("data",(chunk)=>{
        const obData=JSON.parse(chunk);
        // console.log(chunk);
        const arrData=[obData];
        console.log(arrData);
        // console.log("hi");
        const realData=arrData
        .map((val)=>replacerval(htm,val))
        .join("");
        res.write(realData);
        // res.end();
        // console.log(realData);
    })
    .on("end",(err) =>{
        if(err)return console.log("lost",err);
        res.end();
    });
});
// res.end();
   }
   else if(req.url==="/sun.jpg"){
    fs.readFile(path.join(__dirname, 'sun.jpg'), (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error loading image');
        } else {
          res.writeHead(200, { 'Content-Type': 'image/jpeg' });
          res.write(data); 
          res.end();
        }
      });
      
   }
});
// }});
server.listen(port,'127.0.0.1',()=>{
    console.log("started at http://localhost:3000/abhay")
});





// const https = require('https'); 
// https.get("https://api.openweathermap.org/data/2.5/weather?q=kanpur&appid=1854745bde5d050f1f646f7c986ef087", (apiResponse) => {
//   apiResponse. .on("data",(chunk)=>{
//     const obData=JSON.parse(chunk);
//     const arrData=[obData];
//     console.log(arrData);
//     console.log("hi");
// });

// res.end();
// });
// }});

/////////////
///////////////////////////////////////////////////////////////////////////// coord: { lon: 80.35, lat: 26.4667 },
// const http = require('http');
// const https = require('https'); // Use the 'https' module for external API requests

// const server = http.createServer((req, res) => {
//     if (req.url === '/') { // Handle requests to the root path
//         https.get("https://api.openweathermap.org/data/2.5/weather?q=kanpur&appid=1854745bde5d050f1f646f7c986ef087", (apiResponse) => {
//             let data = '';
//             apiResponse.on('data', (chunk) => {
//                 data += chunk;
//             });
//             apiResponse.on('end', () => {
//                 try {
//                     const weatherData = JSON.parse(data);
//                     console.log(weatherData);
//                     res.writeHead(200, { 'Content-Type': 'application/json' });
//                     res.end(JSON.stringify(weatherData));
//                 } catch (error) {
//                     console.error('Error parsing JSON:', error.message);
//                     res.writeHead(500, { 'Content-Type': 'text/plain' });
//                     res.end('Internal Server Error');
//                 }
//             });
//         }).on('error', (error) => {
//             console.error('API request error:', error.message);
//             res.writeHead(500, { 'Content-Type': 'text/plain' });
//             res.end('Internal Server Error');
//         });
//     } else {
//         res.writeHead(404, { 'Content-Type': 'text/plain' });
//         res.end('Not Found');
//     }
// });

// server.listen(3000, '127.0.0.1', () => {
//     console.log("Server is running at http://localhost:3000/");
// });
