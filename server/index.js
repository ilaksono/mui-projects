require('dotenv').config();
const fetch = require('node-fetch')
const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
app.listen(8001,() => console.log('listening on 8001'));

app.post('/api/weather', async(req, res) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${req.body.lat}&lon=${req.body.lng}&appid=${process.env.OPEN_WEATHER_API_KEY}`
  const data = await fetch(url);
  const result = await data.json()
  // console.log(result);

  res.json({data: result})

});

app.get('/api/wiki', async (req, res) => {
  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=5&srsearch=${req.query.search}`
  const data = await fetch(url)
  const result = await data.json();
  // console.log(result);
  res.json({data:result.query.search});
});

app.get('/api/twitch', async(req, res) => {
  const url = `https://twitch-proxy.freecodecamp.rocks/helix/streams?user_login=${req.query.user.toLowerCase()}`;
  const data = await fetch(url);
  const result = await data.json();
  console.log(result);
  res.json({data: result.data[0] || {}})
  
});