import { TodoCreateTemplate } from "../features/todo/components/TodoCreateTemplate/TodoCreateTemplate"
import { BaseLayout } from "../shared/components/layouts/BaseLayout/BaseLayout"

export const TodoCreatePage = () => {
    return (
        <BaseLayout title="Todo Create">
            <TodoCreateTemplate />
        </BaseLayout>
    )
}