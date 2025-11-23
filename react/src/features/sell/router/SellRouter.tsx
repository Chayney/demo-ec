import { Route, Routes } from 'react-router-dom';
import { NAVIGATION_LIST } from '../../../shared/constants/navigation';
import { SellPage } from '../../../pages/SellPage';

export const SellRouter = () => {
	return (
		<Routes>
			<Route path={NAVIGATION_LIST.SELL} element={<SellPage />} />
		</Routes>
	);
};
