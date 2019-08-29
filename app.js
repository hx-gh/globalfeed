//Starting modules
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const PORT = 8080;
const request = require('request')
const path = require('path')
const key = //Put your key here
//Public
app.use(express.static(path.join(__dirname, 'public')))

//bodyParser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
//HandleBars
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')



request(`https://newsapi.org/v2/top-headlines?country=br&apiKey=${key}`, { json: true }, (err, res, body) => {
  if (err) { return console.log(err); 
    }else{
    brData = body;
    console.log(brData);
    request(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${key}`, { json: true }, (err, res, body) => {
      if(err){ return console.log(err)
      }else{
        usData = body;
        console.log(usData)
        request(`https://newsapi.org/v2/top-headlines?q=economy&apiKey=${key}`, { json: true }, (err, res, body) => {
          if(err){return console.log(err)
          }else{
            economy = body;
            console.log(economy)
            app.get("/", (req,res) => {
              res.render("index", {usData, brData, economy})
            })

          }
        })
        
      }
    })
  }
});


//Start no servidor
app.listen(PORT,() => {
    console.log(`Servidor iniciado na porta ${PORT}`)
  })



