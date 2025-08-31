const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/', (req, res) => {
  const date = new Date();
  
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

app.get('/api/:date', (req, res) => {
  let dateParam = req.params.date;
  let date;
  
  if (!isNaN(dateParam)) {
    date = new Date(parseInt(dateParam));
  } else {
    date = new Date(dateParam);
  }
  
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }
  
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});