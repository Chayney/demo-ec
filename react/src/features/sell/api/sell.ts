import { apiClient } from '../../../shared/api/apiClient';
import type { CreateSellRequest, ItemType, SellType } from '../types/sell';

export const getItems = async (): Promise<ItemType> => {
	return await apiClient<ItemType>('/sell', { method: 'GET' });
};

export const createSell = async (request: CreateSellRequest): Promise<SellType> => {
	return await apiClient<SellType>('/sell', {
		method: 'POST',
		body: JSON.stringify(request),
	});
};

// 画像アップロード
export const uploadItemImage = async (formData: FormData): Promise<{ path: string }> => {
	const data = await apiClient<{ path: string }>('/sell/upload', {
		method: 'POST',
		body: formData,
		// Content-Typeはブラウザが自動でmultipart/form-dataを設定
	});

	// DB保存用の相対パスのみ返す
	// images/xxxx.jpg
	return {
		path: data.path,
	};
};
