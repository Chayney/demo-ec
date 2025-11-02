import { Controller } from "react-hook-form";
import { InputFormSection } from "../../../../shared/components/ui/InputFormSection/InputFormSection";
import styles from './style.module.css'
import { TextAreaSection } from "../../../../shared/components/ui/TextAreaSection/TextAreaSection";
import { CommonButton } from "../../../../shared/components/ui/CommonButton/CommonButton";
import { useTodoEdit } from "./useTodoEdit";
import type { FC } from "react";
import type { Todo } from "../../types/todo";

type TodoEditProps = {
    todo: Todo
}

export const TodoEdit: FC<TodoEditProps> = (props) => {
    const { todo } = props;
    const { 
        control,
        errors,
        handleEditTodo
    } = useTodoEdit({todo});

    return (
        <form className={styles.container} onSubmit={handleEditTodo}>
            <div className={styles.area}>
                <Controller
                    name="title"
                    render={({ field }) => (
                        <InputFormSection
                            placeholder="Title"
                            errorMessage={errors.title?.message}
                            {...field}
                        />
                    )}
                    control={control}
                />
            </div>
            <div className={styles.area}>
                <Controller
                    name="content"
                    render={({ field }) => (
                        <TextAreaSection
                            placeholder="Content"
                            errorMessage={errors.content?.message}
                            {...field}
                        />
                    )}
                    control={control}
                />
            </div>
            <div className={styles.area}>
                <CommonButton type="submit">EDIT TODO</CommonButton>
            </div>
        </form>
    )
}