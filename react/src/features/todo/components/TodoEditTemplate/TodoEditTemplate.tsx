import { useParams } from "react-router-dom"
import { useTodoQuery } from "../../hooks/useTodoQuery";
import { PuffLoader } from "react-spinners";
import { TodoEdit } from "../TodoEdit/TodoEdit";

export const TodoEditTemplate = () => {
    const { id } = useParams();
    const { data: todo, isLoading } = useTodoQuery(Number(id));

    if (isLoading) {
        return <PuffLoader />
    }

    return (
        <>
            {!!todo && <TodoEdit todo={todo}/>}
        </>
    )
}