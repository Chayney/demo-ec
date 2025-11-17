import type { ComponentProps, FC } from 'react';
import styles from './style.module.css';

type InputRadioProps = ComponentProps<'input'>;

export const InputRadio: FC<InputRadioProps> = (props) => {
	const { disabled = false, type = 'radio', value, name, onChange, onKeyDown } = props;

	return (
		<input
			disabled={disabled}
			className={styles.input}
			type={type}
			value={value}
			name={name}
			onChange={onChange}
			onKeyDown={onKeyDown}
		/>
	);
};
