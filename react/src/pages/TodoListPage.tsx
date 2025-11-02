import { TodoListTemplate } from "../features/todo/components/TodoListTemplate/TodoListTemplate"
import { BaseLayout } from "../shared/components/layouts/BaseLayout/BaseLayout"

export const TodoListPage = () => {
    return (
        <BaseLayout title="Todo List">
            <TodoListTemplate />
        </BaseLayout>
    )
}