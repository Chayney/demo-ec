import { TodoEditTemplate } from "../features/todo/components/TodoEditTemplate/TodoEditTemplate"
import { BaseLayout } from "../shared/components/layouts/BaseLayout/BaseLayout"

export const TodoEditPage = () => {
    return (
        <BaseLayout title="Todo Edit">
            <TodoEditTemplate />
        </BaseLayout>
    )
}