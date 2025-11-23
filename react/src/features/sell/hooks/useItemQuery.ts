import { useQuery } from '@tanstack/react-query';
import { getItems } from '../api/sell';

export const useItemQuery = () => {
    return useQuery({
        queryKey: ['items'],
        queryFn: getItems
    });
};
