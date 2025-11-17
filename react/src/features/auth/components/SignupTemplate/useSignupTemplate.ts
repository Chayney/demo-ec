import { useSignupMutation } from '../../hooks/useSignupMutation';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';

const schema = z.object({
	name: z.string().min(1, '名前は必須です').max(10, '10文字以内で入力してください'),
	email: z.email('有効なメールアドレスを入力してください'),
	password: z.string().min(8, '8文字以上で入力してください'),
	password_confirmation: z.string().min(8, '8文字以上で入力してください'),
});

export const useSignupTemplate = () => {
	const { signin } = useAuthContext();
	const signupMutation = useSignupMutation();

	const {
		control,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: { name: '', email: '', password: '', password_confirmation: '' },
	});

	const handleSignupSubmit = handleSubmit(
		useCallback(
			async (values: z.infer<typeof schema>) => {
				if (values.password !== values.password_confirmation) {
					setError('password', {
						type: 'manual',
						message: '確認パスワードと一致しません',
					});
					return;
				}
				const { name, email, password } = values;
				try {
					const data = await signupMutation.mutateAsync({
						name,
						email,
						password,
						// 登録時にしか使用しないため明示的に指定
						password_confirmation: values.password_confirmation,
					});
					// ログイン状態を即時反映
					signin(data.user, data.token);
				} catch (error) {
					setError('name', {
						type: 'manual',
						message:
							(
								error as unknown as {
									response?: { data?: { message?: string } };
								}
							).response?.data?.message || '登録に失敗しました。',
					});
				}
			},
			[signin, setError, signupMutation],
		),
	);
	return {
		control,
		errors,
		handleSignupSubmit,
		isLoading: signupMutation.isPending,
	};
};
