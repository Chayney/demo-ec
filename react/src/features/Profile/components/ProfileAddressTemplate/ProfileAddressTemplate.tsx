import { useProfileQuery } from '../../hooks/useProfileQuery';
import { PuffLoader } from 'react-spinners';
import { ProfileAddress } from '../ProfileAddress/ProfileAddress';

export const ProfileAddressTemplate = () => {
	const { data: profile, isLoading } = useProfileQuery('address');

	if (isLoading) {
		return <PuffLoader />;
	}

	return <>{!!profile && <ProfileAddress profile={profile} />}</>;
};
