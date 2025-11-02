import z from "zod";
import { useTodoListQuery } from "../../hooks/useTodoListQuery"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useMemo } from "react";
import { useTodoDelteMutation } from "../../hooks/useTodoDeleteMutation";

const schema = z.object({
    keyword: z.string()
});

export const useTodoListTemplate = () => {
    const { data: todoData, isLoading } = useTodoListQuery();
    const deleteMutation = useTodoDelteMutation();
    const {
        control,
        watch
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: { keyword: '' }
    });

    const searchKeyword = watch('keyword');

    const showTodoList = useMemo(() => {
        if (!todoData) return [];
        return todoData.filter((todo) => todo.title.toLowerCase().startsWith(searchKeyword.toLowerCase()));
    }, [todoData, searchKeyword])

    const handleDeleteTodo = useCallback(
        (id: number) => {
            deleteMutation.mutate({ id });
        }, [deleteMutation]
    )

    return {
        control,
        showTodoList,
        isLoading,
        handleDeleteTodo,
        isDeleting: deleteMutation.isPending
    }
}