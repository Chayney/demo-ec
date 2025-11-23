import { BrowserRouter } from 'react-router-dom';
import { AuthRouter } from '../features/auth/router/AuthRouter';
import { AuthProvider } from '../features/auth/contexts/AuthContext';
import { ProductRouter } from '../features/product/router/ProductRouter';
import { ProfileRouter } from '../features/Profile/router/ProfileRouter';
import { SellRouter } from '../features/sell/router/SellRouter';

export const Router = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<AuthRouter />
				<ProductRouter />
				<ProfileRouter />
				<SellRouter />
			</AuthProvider>
		</BrowserRouter>
	);
};
