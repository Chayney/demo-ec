import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
	component: TextArea,
	title: 'TextArea',
	argTypes: {
		style: {
			control: 'object',
		},
	},
};

export default meta;

type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
	args: {
		placeholder: 'TEST',
		style: { backgroundColor: '#f0f0f0', padding: '10px 20px', borderRadius: '5px' },
	},
};
