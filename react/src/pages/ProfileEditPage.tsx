import { ProfileEditTemplate } from '../features/Profile/components/ProfileEditTemplate/ProfileEditTemplate';
import { BaseLayout } from '../shared/components/layouts/BaseLayout/BaseLayout';

export const ProfileEditPage = () => {
	return (
		<BaseLayout title="Profile Edit">
			<ProfileEditTemplate />
		</BaseLayout>
	);
};
