import { useSigninMutation } from '../../hooks/useSigninMutation';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';

const schema = z.object({
	email: z.email('有効なメールアドレスを入力してください'),
	password: z.string().min(8, '8文字以上で入力してください'),
});

export const useSigninTemplate = () => {
	const { signin } = useAuthContext();
	const signinMutation = useSigninMutation();

	const {
		control,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: { email: '', password: '' },
	});

	const handleSigninSubmit = handleSubmit(
		useCallback(
			async (values: z.infer<typeof schema>) => {
				try {
					const data = await signinMutation.mutateAsync(values);
					// ログイン状態を即時反映
					signin(data.user, data.token);
				} catch (error) {
					setError('email', {
						type: 'manual',
						message:
							(
								error as unknown as {
									response?: { data?: { message?: string } };
								}
							).response?.data?.message || 'ログインに失敗しました。',
					});
				}
			},
			[signin, setError, signinMutation],
		),
	);
	return {
		control,
		errors,
		handleSigninSubmit,
		isLoading: signinMutation.isPending,
	};
};
