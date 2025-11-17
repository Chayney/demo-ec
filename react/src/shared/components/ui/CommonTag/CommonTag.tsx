import type { FC, ReactNode } from 'react';
import styles from './style.module.css';

type CommonTagProps = {
	children: ReactNode;
};

export const CommonTag: FC<CommonTagProps> = (props) => {
	const { children } = props;

	return <span className={styles.tag}>{children}</span>;
};
