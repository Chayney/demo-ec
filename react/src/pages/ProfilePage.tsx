import { ProfileTemplate } from '../features/Profile/components/ProfileTemplate/ProfileTemplate';
import { BaseLayout } from '../shared/components/layouts/BaseLayout/BaseLayout';

export const ProfilePage = () => {
	return (
		<BaseLayout title="Profile">
			<ProfileTemplate />
		</BaseLayout>
	);
};
