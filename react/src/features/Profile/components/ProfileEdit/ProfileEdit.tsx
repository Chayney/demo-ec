import { Controller } from 'react-hook-form';
import { InputFormSection } from '../../../../shared/components/ui/InputFormSection/InputFormSection';
import styles from './style.module.css';
import type { ProfileType } from '../../types/profile';
import type { FC, ChangeEvent } from 'react';
import { useRef } from 'react';
import { CommonButton } from '../../../../shared/components/ui/CommonButton/CommonButton';
import { useProfileEdit } from './useProfileEdit';
import { STORAGE_BASE_URL } from '../../../../shared/api/apiClient';

type ProfileEditProps = {
	profile: ProfileType;
};

export const ProfileEdit: FC<ProfileEditProps> = ({ profile }) => {
	const { control, errors, handleEditSubmit, isLoading, previewUrl } = useProfileEdit({ profile });

	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const getImageUrl = (previewUrl: string) => {
		if (!previewUrl) return;
		
		// 画像アップロード時
		if (previewUrl.startsWith('blob:')) return previewUrl;
		
		// pathにprofileという文字列が含まれていればそのまま返却
		if (previewUrl.includes("profile")) {
			return previewUrl;
		}

		// アップロード画像のURLを返す
		return `${STORAGE_BASE_URL}/${profile.image}`;
	};

	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={handleEditSubmit}>
				<div className={styles.imageArea}>
					<Controller
						name="image"
						control={control}
						render={({ field: { onChange } }) => (
							<div className={styles.imageContainer}>
								{/* プレビュー表示  */}
								<img src={getImageUrl(previewUrl)} className={styles.previewImage} />

								{/* 非表示の input */}
								<input
									type="file"
									accept="image/*"
									ref={fileInputRef}
									style={{ display: 'none' }}
									onChange={(e: ChangeEvent<HTMLInputElement>) => {
										const file = e.target.files?.[0];
										if (file) {
											onChange(file); // react-hook-formにセット
										}
									}}
								/>

								{/* ボタン押下でファイル選択トリガー */}
								<button
									className={styles.button}
									type="button"
									onClick={() => fileInputRef.current?.click()}
								>
									画像を選択する
								</button>
							</div>
						)}
					/>
				</div>
				<div className={styles.area}>
					<Controller
						name="name"
						control={control}
						render={({ field }) => (
							<InputFormSection
								type="text"
								placeholder="Name"
								errorMessage={errors.name?.message}
								{...field}
							/>
						)}
					/>
				</div>
				<div className={styles.area}>
					<Controller
						name="postcode"
						control={control}
						render={({ field }) => (
							<InputFormSection
								type="text"
								placeholder="Postcode"
								errorMessage={errors.postcode?.message}
								{...field}
							/>
						)}
					/>
				</div>
				<div className={styles.area}>
					<Controller
						name="address"
						control={control}
						render={({ field }) => (
							<InputFormSection
								type="text"
								placeholder="Address"
								errorMessage={errors.address?.message}
								{...field}
							/>
						)}
					/>
				</div>
				<div className={styles.area}>
					<Controller
						name="building"
						control={control}
						render={({ field }) => (
							<InputFormSection
								type="text"
								placeholder="Building"
								errorMessage={errors.building?.message}
								{...field}
							/>
						)}
					/>
				</div>
				<div className={styles.area}>
					<CommonButton type="submit" disabled={isLoading}>
						{isLoading ? '更新中...' : '更新する'}
					</CommonButton>
				</div>
			</form>
		</div>
	);
};
