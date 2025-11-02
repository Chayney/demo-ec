import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useTodoCreateMutation } from "../../hooks/useTodoCreateMutation";
import { useNavigate } from "react-router-dom";
import { NAVIGATION_LIST } from "../../../../shared/constants/navigation";

const schema = z.object({
    title: z
        .string()
        .min(1, 'タイトルは必須です'),
    content: z
        .string()
        .min(1, 'コンテンツは必須です')
});

export const useTodoCreateTemplate = () => {
    const navigate = useNavigate();
    const createMutation = useTodoCreateMutation();
    const {
        control,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: { title: '', content: '' }
    });

    const handleCreateTodo = handleSubmit(
        useCallback(
            async (values: z.infer<typeof schema>) => {
                try {
                    await createMutation.mutateAsync(values);
                    navigate(NAVIGATION_LIST.TOP);
                } catch (error) {
                    setError('title', {
                        type: 'manual',
                        message:
                            (
                                error as unknown as {
                                    response?: { data?: { message?: string } }
                                }
                            ).response?.data?.message || '作成に失敗しました'
                    })
                }
            }, [navigate, createMutation, setError]
        )
    )

    return {
        control,
        errors,
        handleCreateTodo,
        isLoading: createMutation.isPending
    }
}