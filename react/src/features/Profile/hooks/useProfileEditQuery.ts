import { useQuery } from '@tanstack/react-query';
import { getProfilepage } from '../api/profile';

export const useProfileEditQuery = () => {
	return useQuery({
		queryKey: ['profiles'],
		queryFn: getProfilepage,
	});
};
