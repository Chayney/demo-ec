import type { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './style.module.css';

type NavigationLinkProps = {
	linkPath: string;
	label: string;
};

export const NavigationLink: FC<NavigationLinkProps> = (props) => {
	const { linkPath, label } = props;

	return (
		<li className={styles.li}>
			<NavLink to={linkPath}>{label}</NavLink>
		</li>
	);
};
