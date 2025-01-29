const express = require('express');
const path = require('path');
const mailparser = require('mailparser');

const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res){
  console.log('POST')
  const emailParser = async () => {
    const parsed = await mailparser.simpleParser(req.body.data);
    return {
      to: parsed.headers.get('to').text,
      subject: parsed.headers.get('subject'),
      text: parsed.text
    }
  }

  return emailParser(req.body.data)
      .then((data) => res.json({ success: { parsed: data } }))
      .catch((error) => { console.log(error)})
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});