import z from "zod"
import type { ProfileType } from "../../types/profile";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { NAVIGATION_PATH } from "../../../../shared/constants/navigation";
import { useProfilePayMutation } from "../../hooks/useProfilePayMutation";

const schema = z.object({
    pay: z.number()
});

type UseProfilePayParam = {
    profile: ProfileType
}

export const useProfilePay = (props: UseProfilePayParam) => {
    const { profile } = props;
    const navigate = useNavigate();
    const editMutation = useProfilePayMutation();
    
    // 支払方法を定義
    const payMethods = [
        { pay: 1, label: "クレジットカード" },
        { pay: 2, label: "銀行振込" },
        { pay: 3, label: "代金引換" }
    ]

    // 支払い変更から購入ページへ遷移するためのproduct.idを取得
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get('id');

    const { 
        control,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: { pay: profile.pay ?? 0 }
    })

    const handlePaySubmit = handleSubmit(
        useCallback(
            async (values: z.infer<typeof schema>) => {
                try {
                    await editMutation.mutateAsync({
                        id: profile.id,
                        pay: values.pay
                    });
                    navigate(`${NAVIGATION_PATH.PURCHASE}/${id}`);
                } catch (error) {
                    setError('pay', {
                        type: 'manual',
                        message:
                            (
                                error as unknown as {
                                    response?: { data?: { message?: string }}
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
        handlePaySubmit,
        isLoading: editMutation.isPending,
        payMethods
    }
}