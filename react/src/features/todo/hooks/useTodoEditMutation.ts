import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { EditTodoRequest } from "../types/todo";
import { editTodo } from "../api/todo";

export const useTodoEditMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: EditTodoRequest) => editTodo(request),
        onSuccess: () => {
            // Todo一覧を再フェッチ
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        }
    });
}