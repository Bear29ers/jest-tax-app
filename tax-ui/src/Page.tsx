import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { Heading, HStack, Spacer, VStack } from '@chakra-ui/react';

import { CalcStatus } from './calcStatus';
import { FormInputs, InputForm } from './InputForm';
import { Result } from './Result';
import { CalcTaxResult, useCalcTax } from './useCalcTax';

// プロパティの型にコールバック関数を追加
type PresentationProps = {
  tax: number | null;
  onInputFormSubmit: SubmitHandler<FormInputs>;
  calcStatus: CalcStatus;
};

// プロパティにコールバック関数を追加
export const Presentation = ({
  tax,
  onInputFormSubmit,
  calcStatus,
}: PresentationProps) => (
  <VStack marginY={5} spacing={5} w="100%" minW="800px">
    <Heading>退職金の所得税計算アプリケーション</Heading>
    <HStack w="100%">
      <Spacer />
      {/* コールバック関数を入力フォームコンポーネントに渡す */}
      <InputForm
        w="480px"
        h="550px"
        onInputFormSubmit={onInputFormSubmit}
        calcStatus={calcStatus}
      />
      <Result tax={tax} calcStatus={calcStatus} />
      <Spacer />
    </HStack>
  </VStack>
);

export const Page = () => {
  // 計算状態から始まる
  const [calcStatus, setCalcStatus] =
    useState<CalcStatus>('before-calculation');
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

    // サブミットすると計算中になる
    setCalcStatus('under-calculation');

    // APIを呼び出す
    mutate(formInputs, {
      onSuccess: async (data) => {
        if (data.ok) {
          const json = (await data.json()) as CalcTaxResult;
          // 呼び出しに成功すると計算成功になる
          setCalcStatus('succeeded');
          // 成功したら結果を更新
          setTax(json.tax);
        } else {
          // 200-299以外の場合は計算失敗
          setCalcStatus('failed');
          setTax(null);
        }
      },
      onError: () => {
        // エラーの場合も計算失敗
        setCalcStatus('failed');
        setTax(null);
      },
    });
  };

  // Presentationコンポーネントを描画 & コールバック関数を渡す
  return (
    <Presentation
      tax={tax}
      onInputFormSubmit={handleInputFormSubmit}
      // 計算状態を渡す
      calcStatus={calcStatus}
    />
  );
};
