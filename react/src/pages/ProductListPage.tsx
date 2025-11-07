import { ProductListTemplate } from "../features/product/components/ProductListTemplate/ProductListTemplate"
import { BaseLayout } from "../shared/components/layouts/BaseLayout/BaseLayout"

export const ProductListPage = () => {
    return (
        <BaseLayout title="Product List">
            <ProductListTemplate />
        </BaseLayout>
    )
}