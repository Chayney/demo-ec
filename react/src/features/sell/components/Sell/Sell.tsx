import { Controller, type Control } from 'react-hook-form';
import { SelectFormSection } from '../../../../shared/components/ui/SelectFormSection/SelectFormSection';
import type { ItemType } from '../../types/sell';
import type { FC } from 'react';
import { useSell } from './useSell';
import { CheckboxDropdownSection } from '../../../../shared/components/ui/CheckboxDropdownSection/CheckboxDropdownSection';
import { schema } from '../SellTemplate/useSellTemplate';
import type z from 'zod';
import styles from './style.module.css';

// 親コンポーネントでのuseFormの型
type FormValues = z.infer<typeof schema>;

type ItemProps = {
	itemData: ItemType;
	control: Control<FormValues>;
};

export const Sell: FC<ItemProps> = (props) => {
	const { itemData, control } = props;

	// 親コンポーネントからセレクトボックスの値とドロップダウンチェックボックスの値を取得
	const { conditions, defaultCondition, defaultCategories } = useSell({ itemData });

	return (
		<div className={styles.area}>
			<span className={styles.formTitle}>商品の状態</span>
			{/* 単一選択 */}
			<Controller
				name="condition_id"
				control={control}
				defaultValue={defaultCondition}
				render={({ field }) => (
					<SelectFormSection
						{...field}
						value={field.value ?? 0}
						onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
							const value = Number(e.target.value);
							// number型に変換
							field.onChange(value);
						}}
					>
						{conditions.map((cond) => (
							<option key={cond.id} value={cond.id}>
								{cond.condition}
							</option>
						))}
					</SelectFormSection>
				)}
			/>

			<span className={styles.formTitle}>カテゴリー</span>
			{/* 複数選択 */}
			<Controller
				name="element_ids"
				control={control}
				defaultValue={defaultCategories}
				render={({ field }) => (
					<CheckboxDropdownSection
						options={itemData.categories.map((cat) => ({ id: cat.id, label: cat.name }))}
						selected={field.value ?? []}
						onChange={(selectedValues: number[]) => {
							// number[]型に変換
							field.onChange(selectedValues);
						}}
					/>
				)}
			/>
		</div>
	);
};
