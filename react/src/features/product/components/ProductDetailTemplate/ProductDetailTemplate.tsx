import { useParams } from 'react-router-dom';
import { useProductQuery } from '../../hooks/useProductQuery';
import { PuffLoader } from 'react-spinners';
import { ProductDetail } from '../ProductDetail/ProductDetail';

export const ProductDetailTemplate = () => {
	const { id } = useParams();
	const { data: product, isLoading } = useProductQuery(Number(id));

	if (isLoading) {
		return <PuffLoader />;
	}

	return <>{!!product && <ProductDetail product={product} />}</>;
};
