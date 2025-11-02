import { Route, Routes } from "react-router-dom"
import { NAVIGATION_LIST } from "../../../shared/constants/navigation"
import { TodoListPage } from "../../../pages/TodoListPage"

export const TodoRouter = () => {
    return (
        <Routes>
            <Route path={NAVIGATION_LIST.TOP} element={<TodoListPage />} />
        </Routes>
    )
}