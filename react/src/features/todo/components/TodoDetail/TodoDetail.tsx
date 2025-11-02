import type { Todo } from "../../types/todo";
import type { FC } from "react";
import styles from './style.module.css'
import { InputForm } from "../../../../shared/components/ui/InputForm/InputForm";
import { TextArea } from "../../../../shared/components/ui/TextArea/TextArea";

type TodoDetailProps = {
    todo: Todo
}

export const TodoDetail: FC<TodoDetailProps> = (props) => {
    const { todo } = props;

    return (
        <div className={styles.container}>
            <div className={styles.area}>
                <InputForm
                    disabled
                    value={todo.title}
                    placeholder="Title"
                />
            </div>
            <div className={styles.area}>
                <TextArea
                    disabled
                    value={todo.content}
                    placeholder="Content"
                />
            </div>
        </div>
    )
}