import z from 'zod';
import type { ProfileType } from '../../types/profile';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { NAVIGATION_LIST } from '../../../../shared/constants/navigation';
import { useProfileEditMutation } from '../../hooks/useProfileEditMutation';
import { STORAGE_BASE_URL } from '../../../../shared/api/apiClient';
import { uploadProfileImage } from '../../api/profile';

const schema = z.object({
	image: z.union([z.instanceof(File), z.string(), z.null()]),
	name: z.string().min(1, 'ユーザー名を入力していください'),
	postcode: z
		.string()
		.min(1, '郵便番号は必須です')
		.regex(/^\d{3}-\d{4}$/, '郵便番号は「123-4567」の形式で入力してください'),
	address: z.string().min(1, '住所は必須です'),
	building: z.string().optional(),
});

type UseProfileParam = {
	profile: ProfileType;
};

export const useProfileEdit = (props: UseProfileParam) => {
	const { profile } = props;
	const navigate = useNavigate();
	const editMutation = useProfileEditMutation();

	const {
		control,
		watch,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			image: profile.image_url, // DB保存用パス images/xxx.jpg
			name: profile.name,
			postcode: profile.postcode,
			address: profile.address,
			building: profile.building ?? '',
		},
	});

	const image = watch('image');

	// プレビューURL生成
	const previewUrl =
		image instanceof File
			? URL.createObjectURL(image)
			: image
				? image.startsWith('http')
					? image
					: `${STORAGE_BASE_URL}/${image}` // DBパス → 表示用URL
				: '/no-image.jpg';

	const handleEditSubmit = handleSubmit(
		useCallback(
			async (values: z.infer<typeof schema>) => {
				try {
					let imagePath: string | undefined;

					if (values.image instanceof File) {
						const formData = new FormData();
						formData.append('file', values.image);
						const data = await uploadProfileImage(formData);
						imagePath = data.path.replace(/^\/+/, ''); // DB保存用に先頭スラッシュ削除
					} else if (typeof values.image === 'string') {
						imagePath = values.image.replace(/^\/+/, '');
					}

					await editMutation.mutateAsync({
						id: profile.id,
						name: values.name,
						postcode: values.postcode,
						address: values.address,
						building: values.building,
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
			[navigate, editMutation, setError, profile.id],
		),
	);

	return {
		control,
		errors,
		handleEditSubmit,
		isLoading: editMutation.isPending,
		previewUrl,
	};
};
