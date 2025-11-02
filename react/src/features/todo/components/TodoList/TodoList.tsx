import { useNavigate } from "react-router-dom"
import type { Todo } from "../../types/todo";
import { useCallback, type FC } from "react";
import { NAVIGATION_PATH } from "../../../../shared/constants/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faPenToSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import styles from './style.module.css'

type TodoListProps = {
    todoList: Todo[],
    onDeleteTodo: (id: number) => void
}

export const TodoList: FC<TodoListProps> = (props) => {
    const { todoList, onDeleteTodo } = props;
    const navigate = useNavigate();

    const handleMoveDetailPage = useCallback(
        (id: number) => navigate(`${NAVIGATION_PATH.DETAIL}/${id}`), [navigate]
    )

    const handleMoveEditPage = useCallback(
        (id: number) => navigate(`${NAVIGATION_PATH.EDIT}/${id}`), [navigate]
    )

    return (
        <ul className={styles.list}>
            {todoList.map((todo) => (
                <li key={todo.id} className={styles.todo}>
                    <span className={styles.task}>{todo.title}</span>
                    <div className={styles.area}>
                        <div className={styles.fa}>
                            <FontAwesomeIcon
                                icon={faFile}
                                size="lg"
                                onClick={() => handleMoveDetailPage(todo.id)}
                            />
                        </div>
                        <div className={styles.fa}>
                            <FontAwesomeIcon
                                icon={faPenToSquare}
                                size="lg"
                                onClick={() => handleMoveEditPage(todo.id)}
                            />
                        </div>
                        <div className={styles.fa}>
                            <FontAwesomeIcon
                                icon={faTrashAlt}
                                size="lg"
                                onClick={() => onDeleteTodo(todo.id)}
                            />
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}