import type { Meta, StoryObj } from '@storybook/react';
import { InputForm } from './InputForm';

const meta: Meta<typeof InputForm> = {
	component: InputForm,
	title: 'InputForm',
	argTypes: {
		style: {
			control: 'object',
		},
	},
};

export default meta;

type Story = StoryObj<typeof InputForm>;

export const Default: Story = {
	args: {
		placeholder: 'TEST',
		style: { backgroundColor: '#f0f0f0', padding: '10px 20px', borderRadius: '5px' },
	},
};
