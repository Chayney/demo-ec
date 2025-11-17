import type { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import styles from './RatingStars.module.css';

type RatingStarsProps = {
	rating: number; // 現在の評価（例: 3）
	max?: number; // 最大値（デフォルト: 5）
	size?: string; // サイズ（例: "24px"）
	color?: string; // 星の色
	onRate?: (value: number) => void; // 星をクリックしたときの処理（任意）
};

export const RatingStars: FC<RatingStarsProps> = ({
	rating,
	max = 5,
	size = '24px',
	color = '#FFD700', // ゴールド
	onRate,
}) => {
	return (
		<div className={styles.container}>
			{[...Array(max)].map((_, index) => {
				const starValue = index + 1;
				const isFilled = starValue <= rating;

				return (
					<FontAwesomeIcon
						key={starValue}
						icon={isFilled ? faStarSolid : faStarRegular}
						onClick={() => onRate && onRate(starValue)}
						className={`${styles.star} ${onRate ? styles.clickable : ''}`}
						style={{ fontSize: size, color }}
					/>
				);
			})}
		</div>
	);
};
