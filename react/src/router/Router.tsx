import { BrowserRouter } from "react-router-dom"
import { AuthRouter } from "../features/auth/router/AuthRouter"
import { AuthProvider } from "../features/auth/contexts/AuthContext"
import { ProductRouter } from "../features/product/router/ProductRouter"

export const Router = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AuthRouter />
                <ProductRouter />
            </AuthProvider>
        </BrowserRouter>
    )
}