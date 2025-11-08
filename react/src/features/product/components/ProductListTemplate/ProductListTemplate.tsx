import { PuffLoader } from "react-spinners";
import { ProductList } from "../ProductList/ProductList"
import { useProductListTemplate } from "./useProductListTemplate"

export const ProductListTemplate = () => {
    const { productList, isLoading } = useProductListTemplate();
    
    if (isLoading) {
        return <PuffLoader />
    }
    return (
        <>
            {productList.length > 0 && (
                <ProductList productList={productList} />
            )}
        </>
    )
}