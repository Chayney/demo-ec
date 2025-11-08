import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { ProfileAddressRequest } from "../types/profile";
import { editProfileAddress } from "../api/profile";

export const useProfileAddressMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: ProfileAddressRequest) => editProfileAddress(request),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profiles'] })
        }
    })
}