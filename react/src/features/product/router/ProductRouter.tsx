import { Route, Routes } from "react-router-dom"
import { NAVIGATION_LIST } from "../../../shared/constants/navigation"
import { ProductListPage } from "../../../pages/ProductListPage"

export const ProductRouter = () => {
    return (
        <Routes>
            <Route path={NAVIGATION_LIST.TOP} element={<ProductListPage />} />
        </Routes>
    )
}