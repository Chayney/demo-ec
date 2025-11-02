import { useQuery } from "@tanstack/react-query"
import { getTodo } from "../api/todo"

export const useTodoQuery = (id: number) => {
    return useQuery({
        queryKey: ['todos', id],
        queryFn: () => getTodo({ id }),
        enabled: !!id
    });
}