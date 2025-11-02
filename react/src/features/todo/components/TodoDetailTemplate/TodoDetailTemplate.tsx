import { useParams } from "react-router-dom";
import { useTodoQuery } from "../../hooks/useTodoQuery"
import { TodoDetail } from "../TodoDetail/TodoDetail";
import { PuffLoader } from "react-spinners";

export const TodoDetailTemplate = () => {
    const { id } = useParams();
    const { data: todo, isLoading } = useTodoQuery(Number(id));

    if (isLoading) {
        return <PuffLoader />
    }

    return (
        <>
            {!!todo && <TodoDetail todo={todo}/>}
        </>
    )
}