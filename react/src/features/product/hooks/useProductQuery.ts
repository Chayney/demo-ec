import { useQuery } from "@tanstack/react-query"
import { getProduct } from "../api/product"

export const useProductQuery = (id: number) => {
    return useQuery({
        queryKey: ['products', id],
        queryFn: () => getProduct({ id }),
        enabled: !!id
    })
}