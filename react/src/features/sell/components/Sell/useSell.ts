import type { ItemType } from '../../types/sell';

type UseItemParam = {
	itemData: ItemType;
};

export const useSell = (props: UseItemParam) => {
	const { itemData } = props;
	// DBには無いため追加
	const conditionsWithDefault = [{ id: 0, condition: '選択してください' }, ...itemData.conditions];

	// 初期値の設定
	const defaultCondition = 0;

	const defaultCategories: number[] = [];

	return {
		conditions: conditionsWithDefault,
		defaultCondition,
		defaultCategories,
	};
};
