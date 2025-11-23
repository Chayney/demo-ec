export type ElementType = {
	id: number;
	name: string;
};

export type ConditionType = {
	id: number;
	condition: string;
};

export type CategoryType = {
	id: number;
	item_id: number;
	element_id: number;
};

export type ItemType = {
	conditions: ConditionType[];
	categories: ElementType[];
};

export type SellType = {
	id: number;
	profile_id: number;
	condition_id: number;
	name: string;
	description?: string | null;
	price: number;
	image: string;
	image_url: string;
	element_ids: number[];
};

export type CreateSellRequest = {
	profile_id: number;
	condition_id: number;
	name: string;
	description?: string | null;
	price: number;
	image: File | string;
	element_ids: number[];
};
