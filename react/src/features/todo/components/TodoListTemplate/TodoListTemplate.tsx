import { TodoList } from "../TodoList/TodoList";
import { useTodoListTemplate } from "./useTodoListTemplate"
import styles from './style.module.css'
import { Controller } from "react-hook-form";
import { InputFormSection } from "../../../../shared/components/ui/InputFormSection/InputFormSection";
import { PuffLoader } from "react-spinners";

export const TodoListTemplate = () => {
    const { 
        control,
        showTodoList,
        isLoading,
        handleDeleteTodo
    } = useTodoListTemplate();

    if (isLoading) {
        return <PuffLoader />
    }

    return (
        <div className={styles.container}>
            <div className={styles.area}>
                <Controller
                    name="keyword"
                    render={({ field }) => (
                        <InputFormSection
                            placeholder="Search Keyword"
                            {...field}
                        />
                    )}
                    control={control}
                />
            </div>
            <div className={styles.area}>
                {showTodoList.length > 0 && (
                    <TodoList todoList={showTodoList} onDeleteTodo={handleDeleteTodo}/>
                )}
            </div>
        </div>
    )
}