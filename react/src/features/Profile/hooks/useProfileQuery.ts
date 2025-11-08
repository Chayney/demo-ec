import { useQuery } from "@tanstack/react-query"
import { getProfile } from "../api/profile"

export const useProfileQuery = () => {
    return useQuery({
        queryKey: ['profiles'],
        queryFn: getProfile
    })
}