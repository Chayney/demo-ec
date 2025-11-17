import { useQuery } from '@tanstack/react-query';
import { checkEntication } from '../api/auth';

export const useCheckEnticationQuery = () => {
	return useQuery({
		queryKey: ['auth'],
		queryFn: checkEntication,
		retry: false,
		staleTime: 1000 * 60 * 30,
	});
};
