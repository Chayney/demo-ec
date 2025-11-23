import { PuffLoader } from 'react-spinners';
import { useProfileEditQuery } from '../../hooks/useProfileEditQuery';
import { ProfileEdit } from '../ProfileEdit/ProfileEdit';

export const ProfileEditTemplate = () => {
	const { data: profile, isLoading } = useProfileEditQuery();
	
	if (isLoading) {
		return <PuffLoader />;
	}
	return <>{!!profile && <ProfileEdit profile={profile} />}</>;
};
