import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SigninRequest } from "../types/auth";
import { signin } from "../api/auth";

export const useSigninMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: SigninRequest) => signin(request),
        onSuccess: (data) => {
            queryClient.setQueryData(['auth'], data),
            queryClient.invalidateQueries({ queryKey: ['auth'] })
        }
    })
}