import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateSellRequest } from '../types/sell';
import { createSell } from '../api/sell';

export const useSellMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (request: CreateSellRequest) => createSell(request),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['mypage'] });
		},
	});
};
