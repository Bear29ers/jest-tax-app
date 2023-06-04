import { Router } from 'express';

import {
  calcIncomeTaxForSeverancePay,
  CalcSeverancePayTaxInputSchema,
} from './calcTax';

const router = Router();

router.post('/calc-tax', (req, res) => {
  // safeParse()は不正な値の場合にも、例外を投げるのではなく戻り値として結果を返す
  const validationResult = CalcSeverancePayTaxInputSchema.safeParse(req.body);
  if (!validationResult.success) {
    res.status(400).json({ message: 'Invalid parameter.' });
    return;
  }

  const incomeTax = calcIncomeTaxForSeverancePay(validationResult.data);
  res.json({ tax: incomeTax });
});

export default router;
