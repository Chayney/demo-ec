import { BaseLayout } from "../../../../shared/components/layouts/BaseLayout/BaseLayout"

export const ProductListTemplate = () => {
    const imageUrl = "http://localhost/images/product1.jpg";
    return (
        <BaseLayout title="Product List">
            <img src={imageUrl} alt="Sample" />;
        </BaseLayout>
    )
}