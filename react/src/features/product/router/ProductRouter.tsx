import { Route, Routes } from "react-router-dom"
import { NAVIGATION_LIST } from "../../../shared/constants/navigation"
import { ProductListPage } from "../../../pages/ProductListPage"
import { ProductDetailPage } from "../../../pages/ProductDetailPage"

export const ProductRouter = () => {
    return (
        <Routes>
            <Route path={NAVIGATION_LIST.TOP} element={<ProductListPage />} />
            <Route path={NAVIGATION_LIST.DETAIL} element={<ProductDetailPage />} />
        </Routes>
    )
}