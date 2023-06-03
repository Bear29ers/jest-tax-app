type CalcRetirementIncomeDeductionInput = {
  // 勤続年数
  yearsOfService: number;
  // 障害者となったことに直接起因して退職したか
  isDisability: boolean;
};

// 退職所得控除額
/*
export const calcRetirementIncomeDeduction = (
  input: CalcRetirementIncomeDeductionInput,
): number => {
  let result = 0;

  if (input.yearsOfService === 1) {
    result = 800_000;
  } else if (input.yearsOfService <= 19) {
    result = 400_000 * input.yearsOfService;
  } else {
    result = 8_000_000 + 700_000 * (input.yearsOfService - 20);
  }

  if (input.isDisability) {
    result += 1_000_000;
  }

  return result;
};
*/

// 退職所得控除額（リファクタリング）
export const calcRetirementIncomeDeduction = ({
  yearsOfService,
  isDisability,
}: CalcRetirementIncomeDeductionInput): number => {
  let deduction = 0;
  if (yearsOfService === 1) {
    deduction = 800_000;
  } else if (yearsOfService <= 19) {
    deduction = 400_000 * yearsOfService;
  } else {
    deduction = 8_000_000 + 700_000 * (yearsOfService - 20);
  }

  if (isDisability) deduction += 1_000_000;

  return deduction;
};
