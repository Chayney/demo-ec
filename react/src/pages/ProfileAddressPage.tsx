import { ProfileAddressTemplate } from "../features/Profile/components/ProfileAddressTemplate/ProfileAddressTemplate"
import { BaseLayout } from "../shared/components/layouts/BaseLayout/BaseLayout"

export const ProfileAddressPage = () => {
    return (
        <BaseLayout title="Profile Address">
            <ProfileAddressTemplate />
        </BaseLayout>
    )
}