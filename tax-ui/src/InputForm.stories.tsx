import { ComponentMeta, ComponentStoryObj } from '@storybook/react';

import { InputForm } from './InputForm';

export default {
  component: InputForm,
} as ComponentMeta<typeof InputForm>;

export const Standard: ComponentStoryObj<typeof InputForm> = {};
