import { useQuery } from "@tanstack/react-query"
import { getProfile } from "../api/profile"

export const useProfileQuery = (type: 'address' | 'pay') => {
    return useQuery({
        queryKey: ['profiles', type],
        queryFn: () => getProfile(type)
    })
}