import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { SignupRequest } from '../types/auth';
import { signup } from '../api/auth';

export const useSignupMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (request: SignupRequest) => signup(request),
		onSuccess: (data) => {
			queryClient.setQueryData(['auth'], data);
			queryClient.invalidateQueries({ queryKey: ['auth'] });
		},
	});
};
