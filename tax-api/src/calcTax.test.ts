import { calcRetirementIncomeDeduction } from './calcTax';

test('退職所得控除額', () => {
  const deduction = calcRetirementIncomeDeduction({
    // 勤続年数
    yearsOfService: 2,
    // 障害者となったことに直接起因して退職したか
    isDisability: false,
  });
  expect(deduction).toBe(800_000);
});
