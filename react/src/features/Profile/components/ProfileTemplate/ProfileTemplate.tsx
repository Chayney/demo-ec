import { PuffLoader } from 'react-spinners';
import { useMypageQuery } from '../../hooks/useMypageQuery';
import { Profile } from '../Profile/Profile';

export const ProfileTemplate = () => {
	const { data: profileData, isLoading } = useMypageQuery();
	console.log(profileData);
	if (isLoading) {
		return <PuffLoader />;
	}

	return <>{!!profileData && <Profile profileData={profileData} />}</>;
};
