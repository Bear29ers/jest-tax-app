import express from 'express';

const app = express();

app.use(express.json());

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

app.post('/check-body', (req, res) => {
  console.dir(req.body);
  res.json({ message: 'Hello JSON body!' });
});

export default app;
