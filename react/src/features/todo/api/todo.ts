import { apiClient } from "../../../shared/api/apiClient";
import type { CreateTodoRequest, DeleteTodoRequest, EditTodoRequest, Todo } from "../types/todo";

export const getTodos = async (): Promise<Todo[]> => {
    return await apiClient<Todo[]>('/todos', { method: 'GET' });
}

export const createTodo = async (
    request: CreateTodoRequest
): Promise<Todo> => {
    return await apiClient<Todo>('/create', {
        method: 'POST',
        body: JSON.stringify(request)
    });
}

export const getTodo = async(): Promise<Todo> => {
    return await apiClient<Todo>('/detail', { method: 'GET' });
}

export const editTodo = async (
    request: EditTodoRequest
): Promise<Todo> => {
    return await apiClient<Todo>('/edit', {
        method: 'PUT',
        body: JSON.stringify(request)
    });
}

export const deleteTodo = async (
    request: DeleteTodoRequest
): Promise<Todo> => {
    return await apiClient<Todo>('/delete', {
        method: 'DELETE',
        body: JSON.stringify(request)
    });
}