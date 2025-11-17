import { Route, Routes } from 'react-router-dom';
import { NAVIGATION_LIST } from '../../../shared/constants/navigation';
import { ProfileAddressPage } from '../../../pages/ProfileAddressPage';
import { ProfilePayPage } from '../../../pages/ProfilePayPage';
import { ProfilePage } from '../../../pages/ProfilePage';
import { ProfileEditPage } from '../../../pages/ProfileEditPage';

export const ProfileRouter = () => {
	return (
		<Routes>
			<Route path={NAVIGATION_LIST.MYPAGE} element={<ProfilePage />} />
			<Route path={NAVIGATION_LIST.EDIT} element={<ProfileEditPage />} />
			<Route path={NAVIGATION_LIST.ADDRESS} element={<ProfileAddressPage />} />
			<Route path={NAVIGATION_LIST.PAY} element={<ProfilePayPage />} />
		</Routes>
	);
};
