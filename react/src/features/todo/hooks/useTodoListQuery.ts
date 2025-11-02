import { useQuery } from "@tanstack/react-query"
import { getTodos } from "../api/todo"

export const useTodoListQuery = () => {
    return useQuery({
        queryKey: ['todos'],
        queryFn: getTodos
    })
}