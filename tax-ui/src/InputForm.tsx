import { SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardProps,
  Center,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Radio,
  RadioGroup,
  Spacer,
  Stack,
  VStack,
} from '@chakra-ui/react';

// Zodのスキーマ
const schema = z
  .object({
    yearsOfService: z.number().int().gte(1).lte(100),
    isDisability: z.boolean(),
    isOfficer: z.string().transform((val) => !!Number(val)), // このプロパティだけバックエンドと定義が異なる
    severancePay: z.number().int().gte(0).lte(1_000_000_000_000),
  })
  .strict();

// フォーム値の型はZodから生成できる
export type FormInputs = z.infer<typeof schema>;

// プロパティ用の型
type InputFormProps = CardProps & {
  onInputFormSubmit: SubmitHandler<FormInputs>;
};

// コールバック関数をプロパティで受け取れるように変更
export const InputForm = ({ onInputFormSubmit, ...props }: InputFormProps) => {
  // フォーム値の型を渡してRHFのuseFormフックを呼び出す
  const {
    register,
    handleSubmit,
    // バリデーションエラーの情報が格納される
    formState: { errors },
  } = useForm<FormInputs>({
    // Zodでバリデーションを実行する
    resolver: zodResolver(schema),
    // ボタンを押したときではなく入力中にバリデーションを実行
    mode: 'onChange',
  });

  // フォームをサブミットしたとき呼び出されるコールバック関数を仮実装
  // const onInputFormSubmit = (formInputs: FormInputs) => {
  //   console.log(formInputs);
  // };

  return (
    <Card w="400px">
      <CardHeader>
        <Center>
          <Heading as="h3" size="md">
            退職金情報を入力してください
          </Heading>
        </Center>
      </CardHeader>
      <CardBody>
        {/* サブミット時に呼び出されるコールバック関数を指定 */}
        <form
          onSubmit={handleSubmit(onInputFormSubmit)}
          // RHFでバリデーションを実行するのでデフォルトのバリデーションをオフにする
          noValidate
        >
          <VStack spacing={5}>
            {/* isInvalidがtrueの場合エラー用の表示になる（Chakra UIの機能） */}
            <FormControl isInvalid={!!errors.yearsOfService}>
              <FormLabel fontWeight="bold">勤続年数</FormLabel>
              <HStack>
                <InputGroup w="120px">
                  <Input
                    type="number"
                    defaultValue="10"
                    // フォームコンポーネントのRHFのコントロール下に置く
                    // valueAsNumberによって数値としてZodに渡される（RHFの機能）
                    {...register('yearsOfService', { valueAsNumber: true })}
                  />
                  <InputRightAddon>年</InputRightAddon>
                </InputGroup>
                <FormHelperText>1年未満の端数は切り上げ</FormHelperText>
              </HStack>
              {/* FormControlのisInvalidがtrueの場合だけ表示される */}
              <FormErrorMessage>
                有効な勤続年数を入力してください
              </FormErrorMessage>
              <Spacer />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="bold">退職起因</FormLabel>
              <Checkbox {...register('isDisability')}>
                障害者となったことに直接起因して退職した
              </Checkbox>
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="bold">役員等以外か役員等か</FormLabel>
              <RadioGroup defaultValue="0">
                <Stack direction="row">
                  <Radio value="0" {...register('isOfficer')}>
                    役員等以外
                  </Radio>
                  <Radio value="1" {...register('isOfficer')}>
                    役員等
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl isInvalid={!!errors.severancePay}>
              <FormLabel fontWeight="bold">退職金</FormLabel>
              <InputGroup w="200px">
                <Input
                  type="number"
                  defaultValue="5000000"
                  {...register('severancePay', { valueAsNumber: true })}
                />
                <InputRightAddon>円</InputRightAddon>
              </InputGroup>
              <FormErrorMessage>
                有効な退職金を入力してください
              </FormErrorMessage>
            </FormControl>
            <Button colorScheme="blue" alignSelf="flex-end" type="submit">
              所得税を計算する
            </Button>
          </VStack>
        </form>
      </CardBody>
    </Card>
  );
};
