import { useParams } from "react-router-dom";
import { useProductQuery } from "../../hooks/useProductQuery"
import { PuffLoader } from "react-spinners";
import { ProductPurchase } from "../ProductPurchase/ProductPurchase";

export const ProductPurchaseTemplate = () => {
    const { id } = useParams();
    const { data: product, isLoading } = useProductQuery(Number(id));
    
    if (isLoading) {
        return <PuffLoader />
    }

    return (
        <>
            {!!product && <ProductPurchase product={product}/>}
        </>
    )
}