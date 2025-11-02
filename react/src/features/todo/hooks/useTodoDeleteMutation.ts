import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { DeleteTodoRequest } from "../types/todo";
import { deleteTodo } from "../api/todo";

export const useTodoDelteMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: DeleteTodoRequest) => deleteTodo(request),
        onSuccess: (_, variables) => {
            // Todo一覧を再フェッチ
            queryClient.invalidateQueries({ queryKey: ['todos'] });
            
            // 個別のTodoを削除
            queryClient.removeQueries({ queryKey: ['todos', variables.id] });
        }
    })
}