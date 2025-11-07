import { ProductDetailTemplate } from "../features/product/components/ProductDetailTemplate/ProductDetailTemplate"
import { BaseLayout } from "../shared/components/layouts/BaseLayout/BaseLayout"

export const ProductDetailPage = () => {
    return (
        <BaseLayout title="Product Detail">
            <ProductDetailTemplate />
        </BaseLayout>
    )
}