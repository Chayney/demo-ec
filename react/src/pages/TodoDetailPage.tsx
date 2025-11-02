import { TodoDetailTemplate } from "../features/todo/components/TodoDetailTemplate/TodoDetailTemplate"
import { BaseLayout } from "../shared/components/layouts/BaseLayout/BaseLayout"

export const TodoDetailPage = () => {
    return (
        <BaseLayout title="Todo Detail">
            <TodoDetailTemplate />
        </BaseLayout>
    )
}