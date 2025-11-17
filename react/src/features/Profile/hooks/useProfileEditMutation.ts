import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ProfileEditRequest } from '../types/profile';
import { editProfile } from '../api/profile';

export const useProfileEditMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (request: ProfileEditRequest) => editProfile(request),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['profiles'] });
		},
	});
};
