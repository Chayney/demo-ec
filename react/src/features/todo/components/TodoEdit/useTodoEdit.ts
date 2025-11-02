import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { NAVIGATION_LIST } from "../../../../shared/constants/navigation";
import { useTodoEditMutation } from "../../hooks/useTodoEditMutation";
import type { Todo } from "../../types/todo";

const schema = z.object({
    title: z
        .string()
        .min(1, 'タイトルは必須です'),
    content: z
        .string()
        .min(1, 'コンテンツは必須です')
});

type UseTodoEditParam = {
    todo: Todo;
};

export const useTodoEdit = (props: UseTodoEditParam) => {
    const { todo } = props;
    const navigate = useNavigate();
    const editMutation = useTodoEditMutation();
    const {
        control,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: { title: todo.title, content: todo.content }
    });

    const handleEditTodo = handleSubmit(
        useCallback(
            async (values: z.infer<typeof schema>) => {
                try {
                    await editMutation.mutateAsync({
                        id: todo.id,
                        title: values.title,
                        content: values.content
                    });
                    navigate(NAVIGATION_LIST.TOP);
                } catch (error) {
                    setError('title', {
                        type: 'manual',
                        message:
                            (
                                error as unknown as {
                                    response?: { data?: { message?: string } }
                                }
                            ).response?.data?.message || '更新に失敗しました'
                    })
                }
            }, [navigate, editMutation, setError]
        )
    )

    return {
        control,
        errors,
        handleEditTodo,
        isLoading: editMutation.isPending
    }
}