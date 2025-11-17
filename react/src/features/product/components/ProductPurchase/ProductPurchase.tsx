import { useCallback, type FC } from 'react';
import type { ProductType } from '../../types/product';
import styles from './style.module.css';
import { CommonButton } from '../../../../shared/components/ui/CommonButton/CommonButton';
import { useNavigate } from 'react-router-dom';
import { NAVIGATION_PATH } from '../../../../shared/constants/navigation';
import type { ProfileType } from '../../../Profile/types/profile';

type ProductPurchaseProps = {
	product: ProductType;
	profile: ProfileType;
};

export const ProductPurchase: FC<ProductPurchaseProps> = (props) => {
	const { product, profile } = props;
	const navigate = useNavigate();

	const handleMovePayPage = useCallback(
		// product.idを付与
		() => navigate(`${NAVIGATION_PATH.PAY}?id=${product.id}`),
		[navigate, product.id],
	);

	const handleMoveAddressPage = useCallback(
		// product.idを付与
		() => navigate(`${NAVIGATION_PATH.ADDRESS}?id=${product.id}`),
		[navigate, product.id],
	);

	const payLabels: Record<number, string> = {
		1: 'クレジットカード',
		2: '銀行振込',
		3: '代金引換',
	};

	return (
		<div className={styles.parentContainer}>
			<div className={styles.childLeftContainer}>
				<div className={styles.itemGroup}>
					<div className={styles.imgGroup}>
						<img className={styles.img} src={product.image_url} alt={product.name} />
					</div>
					<div className={styles.nameGroup}>
						<p>{product.name}</p>
						<p>￥{product.price}</p>
					</div>
				</div>
				<div className={styles.payGroup}>
					<span className={styles.payLabel}>支払い方法</span>
					<a href={`${NAVIGATION_PATH.PAY}?id=${product.id}`} onClick={handleMovePayPage}>
						変更する
					</a>
				</div>
				<div className={styles.addressGroup}>
					<span className={styles.addressLabel}>配送先</span>
					<a href={`${NAVIGATION_PATH.ADDRESS}?id=${product.id}`} onClick={handleMoveAddressPage}>
						変更する
					</a>
				</div>
			</div>
			<div className={styles.childRightContainer}>
				<div className={styles.commonGroup}>
					<span className={styles.commonLabel}>商品代金</span>
					<span className={styles.commonName}>￥{product.price}</span>
				</div>
				<div className={styles.commonGroup}>
					<span className={styles.commonLabel}>支払金額</span>
					{profile.pay === 1 && <span className={styles.commonName}>￥{product.price}</span>}
				</div>
				<div className={styles.commonGroup}>
					<span className={styles.commonLabel}>支払方法</span>
					<span className={styles.commonName}>{payLabels[profile.pay] || ''}</span>
				</div>
				<CommonButton type="submit">購入する</CommonButton>
			</div>
		</div>
	);
};
