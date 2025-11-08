import { apiClient } from "../../../shared/api/apiClient";
import type { GetProductRequest, ProductType } from "../types/product";

export const getProducts = async (): Promise<ProductType[]> => {
    return await apiClient<ProductType[]>('/products', { method: 'GET' });
}

export const getProduct = async (
    request: GetProductRequest
): Promise<ProductType> => {
    const basePath = request.type === 'purchase' ? '/purchase' : '/product'
    return await apiClient<ProductType>(`${basePath}/${request.id}`, { method: 'GET' });
}