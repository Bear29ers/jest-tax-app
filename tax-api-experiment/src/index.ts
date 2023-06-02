import express from 'express';

const app = express();
const port = 3000;

app.get('/', (_, res) => {
  res.send('Hello World!');
});

app.post('/check-post', (_, res) => {
  // res.send('Hello POST!');
  res.json({ message: 'Hello JSON!' });
});

app.post('/check-status-code', (_, res) => {
  res.status(500).json({ message: 'Hello StatusCode!' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
