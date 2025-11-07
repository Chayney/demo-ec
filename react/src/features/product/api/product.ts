import { apiClient } from "../../../shared/api/apiClient";
import type { ProductType } from "../types/product";

export const getProducts = async (): Promise<ProductType[]> => {
    return await apiClient<ProductType[]>('/products', { method: 'GET' });
}

export const getProduct = async (id: number): Promise<ProductType> => {
    return await apiClient<ProductType>(`/product/${id}`, { method: 'GET' });
}