import type { ComponentProps, FC } from 'react';
import styles from './style.module.css';

type SelectFormProps = ComponentProps<'select'>;

export const SelectForm: FC<SelectFormProps> = (props) => {
	const { disabled = false, value, onChange, children, ...rest } = props;

	return (
		<select
			disabled={disabled}
			value={value}
			onChange={onChange}
			className={styles.select}
			{...rest}
		>
			{children}
		</select>
	);
};
