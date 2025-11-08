import z from "zod"
import type { ProfileType } from "../../types/profile";
import { useLocation, useNavigate } from "react-router-dom";
import { useProfileAddressMutation } from "../../hooks/useProfileAddressMutation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { NAVIGATION_PATH } from "../../../../shared/constants/navigation";

const schema = z.object({
    postcode: z
        .string()
        .min(1, '郵便番号は必須です')
        .regex(/^\d{3}-\d{4}$/, '郵便番号は「123-4567」の形式で入力してください'),
    address: z
        .string()
        .min(1, '住所は必須です'),
    building: z.string().optional()
});

type UseProfileAddressParam = {
    profile: ProfileType
}

export const useProfileAddress = (props: UseProfileAddressParam) => {
    const { profile } = props;
    const navigate = useNavigate();
    const editMutation = useProfileAddressMutation();

    // 住所変更から購入ページへ遷移するためのproduct.idを取得
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
        defaultValues: { postcode: profile.postcode, address: profile.address, building: profile.building ?? ''}
    })

    const handleAddressSubmit = handleSubmit(
        useCallback(
            async (values: z.infer<typeof schema>) => {
                try {
                    await editMutation.mutateAsync({
                        postcode: values.postcode,
                        address: values.address,
                        building: values.building
                    });
                    navigate(`${NAVIGATION_PATH.PURCHASE}/${id}`);
                } catch (error) {
                    setError('postcode', {
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
        handleAddressSubmit,
        isLoading: editMutation.isPending
    }
}