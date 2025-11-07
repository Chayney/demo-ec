import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../api/product"

export const useProductListQuery = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: getProducts
    })
}