const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

// Routes:

app.use(express.static(process.cwd() + '/build'));

app.get('/api/config', (req, res) => {

  res.status(200).json({env: process.env.APP_ENV});
})

// TODO:
// - Add static routes where is needed.

// Send for any other route /build/index.html.
app.use("*", (req, res) => {

  res.sendFile(process.cwd() + '/build/index.html');
})

// set app PORT.

app.set("PORT", process.env.APP_ENV === 'local' ? 8080 : process.env.PORT);

app.listen(app.get('PORT'), () => {
  console.log("The app is up on PORT: " + app.get('PORT'));
});
