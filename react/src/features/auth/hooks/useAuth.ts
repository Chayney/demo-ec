import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useCheckEnticationQuery } from './useCheckEnticationQuery';
import { useCallback } from 'react';
import type { UserType } from '../types/auth';
import { NAVIGATION_LIST } from '../../../shared/constants/navigation';

export const useAuth = () => {
	// アプリ全体で共有
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { data: authData, isLoading } = useCheckEnticationQuery();
	const user = authData?.user || null;
	const isAuth = !!authData?.user;

	const signin = useCallback(
		(user: UserType, token: string) => {
			// キャッシュ保存
			queryClient.setQueryData(['auth'], { user, token });

			// localStorageにトークン保存
			localStorage.setItem('authToken', token);

			// TOP画面に遷移
			navigate(NAVIGATION_LIST.TOP);
		},
		[navigate, queryClient],
	);

	const signout = useCallback(() => {
		// キャッシュ(キー)削除
		queryClient.removeQueries({ queryKey: ['auth'] });

		// localStorageのトークン削除
		localStorage.removeItem('authToken');

		// ログイン画面に遷移
		navigate(NAVIGATION_LIST.SIGNIN);
	}, [navigate, queryClient]);

	return {
		user,
		isAuth,
		isLoading,
		signin,
		signout,
	};
};
