import { calcRetirementIncomeDeduction } from './calcTax';

/*
test('退職所得控除額', () => {
  const deduction = calcRetirementIncomeDeduction({
    // 勤続年数
    yearsOfService: 2,
    // 障害者となったことに直接起因して退職したか
    isDisability: false,
  });
  expect(deduction).toBe(800_000);
});
*/

/*
describe('退職所得控除額', () => {
  test.each`
    yearsOfService | isDisability | expected
    ${1}           | ${false}     | ${800_000}
    ${2}           | ${false}     | ${800_000}
    ${3}           | ${false}     | ${1_200_000}
    ${19}          | ${false}     | ${7_600_000}
    ${20}          | ${false}     | ${8_000_000}
    ${21}          | ${false}     | ${8_700_000}
    ${30}          | ${false}     | ${15_000_000}
    ${1}           | ${true}      | ${1_800_000}
    ${2}           | ${true}      | ${1_800_000}
    ${3}           | ${true}      | ${2_200_000}
    ${19}          | ${true}      | ${8_600_000}
    ${20}          | ${true}      | ${9_000_000}
    ${21}          | ${true}      | ${9_700_000}
    ${30}          | ${true}      | ${16_000_000}
  `(
    '$yearsOfService年 isDisability:$isDisability → $expected',
    ({ yearsOfService, isDisability, expected }) => {
      const deduction = calcRetirementIncomeDeduction({
        yearsOfService, // 勤続年数
        isDisability, // 障害者となったことに直接起因して退職したか
      });
      expect(deduction).toBe(expected);
    },
  );
});
*/

// リファクタリング
describe('退職所得控除額', () => {
  describe('勤続年数が1年の場合', () => {
    describe('「障害者となったことに直接起因して退職」に該当しない場合', () => {
      test.each`
        yearsOfService | expected
        ${1}           | ${800_000}
      `(
        '勤続年数$yearsOfService年 → $expected円',
        ({ yearsOfService, expected }) => {
          const deduction = calcRetirementIncomeDeduction({
            yearsOfService,
            isDisability: false,
          });
          expect(deduction).toBe(expected);
        },
      );
    });

    describe('「障害者となったことに直接起因して退職」に該当する場合', () => {
      test.each`
        yearsOfService | expected
        ${1}           | ${1_800_000}
      `(
        '勤続年数$yearsOfService年 → $expected円',
        ({ yearsOfService, expected }) => {
          const deduction = calcRetirementIncomeDeduction({
            yearsOfService,
            isDisability: true,
          });
          expect(deduction).toBe(expected);
        },
      );
    });
  });

  describe('勤続年数が2年から19年の場合', () => {
    describe('「障害者となったことに直接起因して退職」に該当しない場合', () => {
      test.each`
        yearsOfService | expected
        ${2}           | ${800_000}
        ${3}           | ${1_200_000}
        ${19}          | ${7_600_000}
      `(
        '勤続年数$yearsOfService年 → $expected円',
        ({ yearsOfService, expected }) => {
          const deduction = calcRetirementIncomeDeduction({
            yearsOfService,
            isDisability: false,
          });
          expect(deduction).toBe(expected);
        },
      );
    });

    describe('「障害者となったことに直接起因して退職」に該当する場合', () => {
      test.each`
        yearsOfService | expected
        ${2}           | ${1_800_000}
        ${3}           | ${2_200_000}
        ${19}          | ${8_600_000}
      `(
        '勤続年数$yearsOfService年 → $expected円',
        ({ yearsOfService, expected }) => {
          const deduction = calcRetirementIncomeDeduction({
            yearsOfService,
            isDisability: true,
          });
          expect(deduction).toBe(expected);
        },
      );
    });
  });

  describe('勤続年数が20年超の場合', () => {
    describe('「障害者となったことに直接起因して退職」に該当しない場合', () => {
      test.each`
        yearsOfService | expected
        ${20}          | ${8_000_000}
        ${21}          | ${8_700_000}
        ${30}          | ${15_000_000}
      `(
        '勤続年数$yearsOfService年 → $expected円',
        ({ yearsOfService, expected }) => {
          const deduction = calcRetirementIncomeDeduction({
            yearsOfService,
            isDisability: false,
          });
          expect(deduction).toBe(expected);
        },
      );
    });

    describe('「障害者となったことに直接起因して退職」に該当する場合', () => {
      test.each`
        yearsOfService | expected
        ${20}          | ${9_000_000}
        ${21}          | ${9_700_000}
        ${30}          | ${16_000_000}
      `(
        '勤続年数$yearsOfService年 → $expected円',
        ({ yearsOfService, expected }) => {
          const deduction = calcRetirementIncomeDeduction({
            yearsOfService,
            isDisability: true,
          });
          expect(deduction).toBe(expected);
        },
      );
    });
  });
});
