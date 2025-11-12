import { ProfilePayTemplate } from "../features/Profile/components/ProfilePayTemplate/ProfilePayTemplate"
import { BaseLayout } from "../shared/components/layouts/BaseLayout/BaseLayout"

export const ProfilePayPage = () => {
    return (
        <BaseLayout title="Profile Pay">
            <ProfilePayTemplate />
        </BaseLayout>
    )
}