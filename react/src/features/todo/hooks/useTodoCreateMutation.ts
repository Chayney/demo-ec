import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { CreateTodoRequest } from "../types/todo";
import { createTodo } from "../api/todo";

export const useTodoCreateMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: CreateTodoRequest) => createTodo(request),
        onSuccess: () => {
            // Todo一覧を再フェッチ
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        }
    });
}