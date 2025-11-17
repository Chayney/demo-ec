import type { ComponentProps, FC } from 'react';
import { TextArea } from '../TextArea/TextArea';
import styles from './style.module.css';

type TextAreaSectionProps = ComponentProps<'textarea'> & {
	errorMessage?: string;
};

export const TextAreaSection: FC<TextAreaSectionProps> = (props) => {
	return (
		<>
			<TextArea placeholder="Content" {...props} />
			{props?.errorMessage && <p className={styles.error}>{props.errorMessage}</p>}
		</>
	);
};
