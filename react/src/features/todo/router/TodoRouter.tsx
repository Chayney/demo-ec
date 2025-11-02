import { Route, Routes } from "react-router-dom"
import { NAVIGATION_LIST } from "../../../shared/constants/navigation"
import { TodoListPage } from "../../../pages/TodoListPage"
import { TodoCreatePage } from "../../../pages/TodoCreatePage"
import { TodoDetailPage } from "../../../pages/TodoDetailPage"
import { TodoEditPage } from "../../../pages/TodoEditPage"

export const TodoRouter = () => {
    return (
        <Routes>
            <Route path={NAVIGATION_LIST.TOP} element={<TodoListPage />} />
            <Route path={NAVIGATION_LIST.CREATE} element={<TodoCreatePage />} />
            <Route path={NAVIGATION_LIST.DETAIL} element={<TodoDetailPage />} />
            <Route path={NAVIGATION_LIST.EDIT} element={<TodoEditPage />} />
        </Routes>
    )
}