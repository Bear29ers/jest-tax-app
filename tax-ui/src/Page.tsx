import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { Heading, HStack, Spacer, VStack } from '@chakra-ui/react';

import { FormInputs, InputForm } from './InputForm';
import { Result } from './Result';
import { CalcTaxParam, CalcTaxResult, useCalcTax } from './useCalcTax';

// プロパティの型にコールバック関数を追加
type PresentationProps = {
  tax: number | null;
  onInputFormSubmit: SubmitHandler<FormInputs>;
};

// プロパティにコールバック関数を追加
export const Presentation = ({ tax, onInputFormSubmit }: PresentationProps) => (
  <VStack marginY={5} spacing={5} w="100%" minW="800px">
    <Heading>退職金の所得税計算アプリケーション</Heading>
    <HStack w="100%">
      <Spacer />
      {/* コールバック関数を入力フォームコンポーネントに渡す */}
      <InputForm w="480px" h="500px" onInputFormSubmit={onInputFormSubmit} />
      <Result tax={tax} />
      <Spacer />
    </HStack>
  </VStack>
);

export const Page = () => {
  // 計算結果を保持しておくState
  const [tax, setTax] = useState<number | null>(null);

  // フックを使用してmutate関数を取得する
  const { mutate } = useCalcTax();

  // フォームサブミット時に呼ばれるコールバック関数を定義
  const handleInputFormSubmit = (formInputs: FormInputs) => {
    // フォームとAPIパラメータで方が異なるので変換
    // Zodが型を変換するので、この変換は不要
    // const param: CalcTaxParam = {
    //   yearsOfService: Number(formInputs.yearsOfService),
    //   isDisability: formInputs.isDisability,
    //   isOfficer: !!Number(formInputs.isOfficer),
    //   severancePay: Number(formInputs.severancePay),
    // };

    // APIを呼び出す
    mutate(formInputs, {
      onSuccess: async (data) => {
        if (data.ok) {
          const json = (await data.json()) as CalcTaxResult;
          // 成功したら結果を更新
          setTax(json.tax);
        }
      },
    });
  };

  // Presentationコンポーネントを描画 & コールバック関数を渡す
  return <Presentation tax={tax} onInputFormSubmit={handleInputFormSubmit} />;
};
