import { useProductListQuery } from "../../hooks/useProductListQuery"

export const useProductListTemplate = () => {
    const { data: productList, isLoading } = useProductListQuery();

    return {
        productList: productList ?? [], // 一旦の対処
        isLoading
    }
}