type calcRetirementIncomeDeductionInput = {
  // 勤続年数
  yearsOfService: number;
  // 障害者となったことに直接起因して退職したか
  isDisability: boolean;
};

// 退職所得控除額
export const calcRetirementIncomeDeduction = (
  input: calcRetirementIncomeDeductionInput,
) => {
  return 800_000;
};
