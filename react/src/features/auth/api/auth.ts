import { apiClient, getToken, setFetchAuthentication } from "../../../shared/api/apiClient";
import type { AuthType, SigninRequest, SignupRequest } from "../types/auth";

export const signup = async (
    request: SignupRequest
): Promise<AuthType> => {
    const response = await apiClient<AuthType>('/signup', {
        method: 'POST',
        body: JSON.stringify(request)
    });

    return response;
}

export const signin = async (
    request: SigninRequest
): Promise<AuthType> => {
    const response = await apiClient<AuthType>('/signin', {
        method: 'POST',
        body: JSON.stringify(request),
    });

    // 取得したトークンを保存
    if (response.token) {
        setFetchAuthentication(response.token);
    }

    return response;
};

export const checkEntication = async (): Promise<AuthType | null> => {
    const token = getToken();
    if (!token) return null;

    const response = await apiClient<AuthType>('/authentication', {
        method: 'POST',
    });

    return response;
}