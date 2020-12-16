const { response } = require('express');
const express = require('express')
const app = express()
const port = 3000
const path = require('path'); 

fetch('https://vejr.eu/api.php?location=N%C3%A6stved&degree=C')
.then(response => {
  return response.json();
})
.then(users => {
  console.log(users)
})
app.use('/static', express.static(path.join(__dirname, 'Sensor')));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
