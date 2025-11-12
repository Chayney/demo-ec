import { useProfileQuery } from "../../hooks/useProfileQuery";
import { PuffLoader } from "react-spinners";
import { ProfilePay } from "../ProfilePay/ProfilePay";

export const ProfilePayTemplate = () => {
    const { data: profile, isLoading } = useProfileQuery('pay');

    if (isLoading) {
        return <PuffLoader />
    }

    return (
        <>
            {!!profile && <ProfilePay profile={profile} />}
        </>
    )
}