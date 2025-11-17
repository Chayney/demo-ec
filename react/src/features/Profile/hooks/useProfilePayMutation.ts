import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ProfilePayRequest } from '../types/profile';
import { editProfilePay } from '../api/profile';

export const useProfilePayMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (request: ProfilePayRequest) => editProfilePay(request),
		onSuccess: (data, variables) => {
			queryClient.setQueryData(['profiles', variables.id], data);
			queryClient.invalidateQueries({ queryKey: ['profiles'] });
		},
	});
};
