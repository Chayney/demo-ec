import z from "zod";
import { useSellMutation } from "../../hooks/useSellMutation"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { NAVIGATION_LIST } from "../../../../shared/constants/navigation";
import { uploadItemImage } from "../../api/sell";
import { STORAGE_BASE_URL } from "../../../../shared/api/apiClient";

export const schema = z.object({
    image: z.union([z.instanceof(File), z.string().min(1, '画像は必須です')]),
    profile_id: z.number(),
    condition_id: z
        .number()
        .min(1, "商品の状態を選択してください"),
    element_ids: z
        .array(z.number().min(1, "カテゴリーを選択してください")),
    name: z
        .string()
        .min(1, "商品名を入力してください"),
    description: z.string().optional(),
    price: z
        .number()
        .min(1, "販売価格を入力してください")
})

export const useSellTemplate = () => {
    const sellMutation = useSellMutation();
    const navigate = useNavigate();

    const {
        control,
        watch,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            image: '', // DB保存用パス images/xxx.jpg
            profile_id: 0,
            condition_id: 0,
            element_ids: [],
            name: '',
            description: '',
            price: 0,
        }
    })

    const image = watch('image');

    // プレビューURL生成
    const previewUrl =
        image instanceof File
            ? URL.createObjectURL(image)
            : image
                ? image.startsWith('http')
                    ? image
                    : `${STORAGE_BASE_URL}/${image}`
                : '/no-image.jpg';

    const handleSellSubmit = handleSubmit(
        useCallback(
            async (values: z.infer<typeof schema>) => {
                try {
                    let imagePath: string = '';

                    if (values.image instanceof File) {
                        const formData = new FormData();
                        formData.append('file', values.image);
                        const data = await uploadItemImage(formData);
                        imagePath = data.path.replace(/^\/+/, ''); // DB保存用に先頭スラッシュ削除
                    } else if (typeof values.image === 'string') {
                        imagePath = values.image.replace(/^\/+/, '');
                    }

                    await sellMutation.mutateAsync({
                        profile_id: values.profile_id,
                        condition_id: values.condition_id,
                        element_ids: values.element_ids,
                        name: values.name,
                        description: values.description ?? '',
                        price: values.price,
                        image: imagePath,
                    });

                    navigate(NAVIGATION_LIST.MYPAGE);
                } catch (error) {
                    console.error(error);
                    setError('name', {
                        type: 'manual',
                        message:
                            (
                                error as unknown as {
                                    response?: { data?: { message?: string } };
                                }
                            ).response?.data?.message || '更新に失敗しました',
                    });
                }
            },
            [navigate, sellMutation, setError],
        ),
    );

    return {
        control,
        errors,
        handleSellSubmit,
        previewUrl,
    }
}