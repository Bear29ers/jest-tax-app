import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Heading,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';

import { CalcStatus } from './calcStatus';

type ResultProps = {
  tax: number | null;
  calcStatus: CalcStatus;
};

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ja-JP').format(price);
};

// BeforeCalculationViewのコード内に埋め込めば意味が明確なので削除
// const noValueStr = '---';

// 各計算状態に対するコンポーネントを作成
const BeforeCalculationView = () => (
  <Box aria-label="tax">
    <Text as="span" fontSize="6xl">
      ---
    </Text>
    <Text as="span" marginLeft={1}>
      円
    </Text>
  </Box>
);

const UnderCalculationView = () => <Spinner size="xl" m={5} />;

const FailedView = () => (
  <Alert status="error">
    <AlertIcon />
    <AlertDescription>
      エラーが発生しました。しばらくしてからもう一度お試しください。
    </AlertDescription>
  </Alert>
);

const SucceededView = ({ tax }: { tax: number | null }) => {
  const taxStr = formatPrice(tax ?? 0);
  return (
    <Box aria-label="tax">
      <Text as="span" fontSize="6xl">
        {taxStr}
      </Text>
      <Text as="span" marginLeft={1}>
        円
      </Text>
    </Box>
  );
};

// 計算状態によって表示するコンポーネントを切り替える
const CalcStatusView = ({
  tax,
  calcStatus,
}: {
  tax: number | null;
  calcStatus: CalcStatus;
}) => {
  switch (calcStatus) {
    case 'before-calculation':
      return <BeforeCalculationView />;
    case 'under-calculation':
      return <UnderCalculationView />;
    case 'succeeded':
      return <SucceededView tax={tax} />;
    default:
      return <FailedView />;
  }
};

export const Result = ({ tax, calcStatus, ...props }: ResultProps) => {
  return (
    <Card w="480px" h="550px" {...props}>
      <CardHeader>
        <Center>
          <Heading as="h3" size="md">
            退職金にかかる所得税
          </Heading>
        </Center>
      </CardHeader>
      <CardBody>
        <VStack>
          {/* <CalcStatusViewに計算状態を渡して描画 */}
          <CalcStatusView tax={tax} calcStatus={calcStatus} />
        </VStack>
      </CardBody>
    </Card>
  );
};
