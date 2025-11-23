import { useCallback, type FC } from 'react';
import type { ProductType } from '../../types/product';
import styles from './style.module.css';
import { useNavigate } from 'react-router-dom';
import { NAVIGATION_PATH } from '../../../../shared/constants/navigation';
import { STORAGE_BASE_URL } from '../../../../shared/api/apiClient';

type ProductListProps = {
	productList: ProductType[];
};

export const ProductList: FC<ProductListProps> = (props) => {
	const { productList } = props;
	const navigate = useNavigate();

	const handleMoveDetailPage = useCallback(
		(id: number) => navigate(`${NAVIGATION_PATH.DETAIL}/${id}`),
		[navigate],
	);

	const processedItems = productList.map(item => {
		let image_url = '';

		if (item.image.includes('product')) {
			// ダミーデータの場合はそのまま
			image_url = item.image_url || item.image;
		} else {
			// 新規アップロード画像の場合
			image_url = `${STORAGE_BASE_URL}/${item.image}`;
		}

		return {
			...item,
			image_url,
		};
	});

	return (
		<div className={styles.parentContainer}>
			{processedItems.map((product) => (
				<div key={product.id} className={styles.childContainer}>
					<a
						href={`${NAVIGATION_PATH.DETAIL}/${product.id}`}
						onClick={() => handleMoveDetailPage(product.id)}
					>
						<img className={styles.img} src={product.image_url} alt={product.name} />
					</a>
					<div className={styles.info}>
						<a
							href={`${NAVIGATION_PATH.DETAIL}/${product.id}`}
							onClick={() => handleMoveDetailPage(product.id)}
						>
							<span className={styles.name} onClick={() => handleMoveDetailPage(product.id)}>
								{product.name}
							</span>
						</a>
						<span className={styles.price}>￥{product.price}</span>
					</div>
				</div>
			))}
		</div>
	);
};
