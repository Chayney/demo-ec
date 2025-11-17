import { useParams } from 'react-router-dom';
import { useProductQuery } from '../../hooks/useProductQuery';
import { PuffLoader } from 'react-spinners';
import { ProductPurchase } from '../ProductPurchase/ProductPurchase';
import { useProfileQuery } from '../../../Profile/hooks/useProfileQuery';

export const ProductPurchaseTemplate = () => {
	const { id } = useParams();
	const { data: product, isLoading } = useProductQuery(Number(id));
	const { data: profile } = useProfileQuery('pay');

	if (isLoading) {
		return <PuffLoader />;
	}

	return <>{!!product && !!profile && <ProductPurchase product={product} profile={profile} />}</>;
};
