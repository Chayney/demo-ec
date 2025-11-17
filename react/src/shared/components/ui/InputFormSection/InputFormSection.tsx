import type { ComponentProps, FC } from 'react';
import { InputForm } from '../InputForm/InputForm';
import styles from './style.module.css';

type InputFormSectionProps = ComponentProps<'input'> & {
	errorMessage?: string;
};

export const InputFormSection: FC<InputFormSectionProps> = (props) => {
	return (
		<>
			<InputForm placeholder="Title" {...props} />
			{props?.errorMessage && <p className={styles.error}>{props.errorMessage}</p>}
		</>
	);
};
