import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { Heading, HStack, Spacer, VStack } from '@chakra-ui/react';

import { FormInputs, InputForm } from './InputForm';
import { Result } from './Result';

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
  // TODO: APIからデータを取得する
  const [tax] = useState(10000);

  // フォームサブミット時に呼ばれるコールバック関数を定義
  const handleInputFormSubmit = (formInputs: FormInputs) => {
    console.log(formInputs);
  };

  // Presentationコンポーネントを描画 & コールバック関数を渡す
  return <Presentation tax={tax} onInputFormSubmit={handleInputFormSubmit} />;
};
