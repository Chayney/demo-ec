import { ProductPurchaseTemplate } from '../features/product/components/ProductPurchaseTemplate/ProductPurchaseTemplate';
import { BaseLayout } from '../shared/components/layouts/BaseLayout/BaseLayout';

export const ProductPurchasePage = () => {
	return (
		<BaseLayout title="Product Purchase">
			<ProductPurchaseTemplate />
		</BaseLayout>
	);
};
