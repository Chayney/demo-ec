import { useQuery } from "@tanstack/react-query"
import { getMypage } from "../api/profile"

export const useMypageQuery = () => {
    return useQuery({
        queryKey: ['mypage'],
        queryFn: getMypage
    })
}