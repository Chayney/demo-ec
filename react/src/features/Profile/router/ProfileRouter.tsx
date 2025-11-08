import { Route, Routes } from "react-router-dom"
import { NAVIGATION_LIST } from "../../../shared/constants/navigation"
import { ProfileAddressPage } from "../../../pages/ProfileAddressPage"

export const ProfileRouter = () => {
    return (
        <Routes>
            <Route path={NAVIGATION_LIST.ADDRESS} element={<ProfileAddressPage />} />
        </Routes>
    )
}