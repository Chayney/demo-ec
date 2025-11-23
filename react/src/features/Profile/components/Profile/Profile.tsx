import { useCallback, useState, type FC } from 'react';
import { CommonButton } from '../../../../shared/components/ui/CommonButton/CommonButton';
import type { ProfileInfo } from '../../types/profile';
import styles from './style.module.css';
import { useNavigate } from 'react-router-dom';
import { NAVIGATION_PATH } from '../../../../shared/constants/navigation';
import { STORAGE_BASE_URL } from '../../../../shared/api/apiClient';

type ProfileProps = {
	profileData: ProfileInfo;
};

type Tab = 'items' | 'purchaseItems';

export const Profile: FC<ProfileProps> = (props) => {
	const { profileData } = props;
	// profileData(1つのオブジェクト内にitems配列とpurchaseItems配列が存在)
	const { profile, items, purchaseItems } = profileData;

	// タブ切り替え用state
	const [activeTab, setActiveTab] = useState<Tab>('items');

	// itemsを展開してimage_urlを付与した新しい配列を作成
	const processedItems = items.map(item => {
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

	// 表示する商品の配列を切り替える
	const displayedItems = activeTab === 'items' ? processedItems : purchaseItems;
	
	const navigate = useNavigate();

	const handleMoveEditPage = useCallback(() => navigate(`${NAVIGATION_PATH.EDIT}`), [navigate]);

	// プロフィール画像
	const getImageUrl = (path: string | undefined) => {
		if (!path) return;
		
		// pathにprofileという文字列が含まれていればそのまま返却
		if (path.includes("profile")) {
			return path;
		}

		// アップロード画像のURLを返す
		return `${STORAGE_BASE_URL}/${profile.image}`;
	};

	return (
		<div className={styles.container}>
			<div className={styles.topContainer}>
				<div className={styles.profileGroup}>
					<img className={styles.profileImg} src={getImageUrl(profile.image_url)} />
					<span className={styles.profileName}>{profile.name}</span>
				</div>
				<CommonButton className={styles.button} onClick={handleMoveEditPage}>
					プロフィールを編集する
				</CommonButton>
			</div>

			{/* タブボタン */}
			<div className={styles.tabContainer}>
				<button
					className={`${styles.tab} ${activeTab === 'items' ? styles.activeTab : ''}`}
					onClick={() => setActiveTab('items')}
				>
					出品商品
				</button>
				<button
					className={`${styles.tab} ${activeTab === 'purchaseItems' ? styles.activeTab : ''}`}
					onClick={() => setActiveTab('purchaseItems')}
				>
					購入商品
				</button>
			</div>

			<div className={styles.underContainer}>
				{displayedItems.length === 0 ? (
					<span>商品がありません</span>
				) : (
					displayedItems.map((item) => (
						<div key={item.id} className={styles.childContainer}>
							<img className={styles.img} src={item.image_url} alt={item.name} />
							<div className={styles.info}>
								<span className={styles.name}>{item.name}</span>
								<span className={styles.price}>￥{item.price}</span>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
};
