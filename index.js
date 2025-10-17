// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
app.get("/api/:date?", function (req, res) {
  let dateInput = req.params.date;

  // 1. Handle the empty date parameter (Passed Tests 7 & 8)
  if (!dateInput) {
    return res.json({
      unix: new Date().getTime(),
      utc: new Date().toUTCString()
    });
  }

  // 2. Determine if the input is a potential Unix timestamp (long number)
  // or a date string. Unix timestamps are typically 13 digits (ms).
  let date;
  if (dateInput.length >= 10 && !isNaN(Number(dateInput))) {
    // Treat as a millisecond timestamp (type Number)
    date = new Date(Number(dateInput));
  } else {
    // Treat as a date string
    date = new Date(dateInput);
  }

  // 3. Check for "Invalid Date" (Failed Test 5 & Passed Test 6)
  // The standard way to check for an invalid date object is to check its time value.
  if (isNaN(date.getTime())) {
    return res.json({ error: 'Invalid Date' });
  }

  // 4. Return the successful result (Passed Tests 2, 3, 4)
  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
