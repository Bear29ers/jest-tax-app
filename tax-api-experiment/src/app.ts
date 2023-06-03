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

type CalcInput = {
  yearsOfService: number;
  isDisability: boolean;
  isOfficier: boolean;
  severancePay: number;
};

const calcTax = (input: CalcInput) => {
  // TODO: 退職金の所得税を計算する
  return 10000;
};

app.post('/calc-tax', (req, res) => {
  res.json({ tax: calcTax(req.body) });
});

export default app;
