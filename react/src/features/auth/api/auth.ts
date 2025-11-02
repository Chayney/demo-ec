import { BASE_APP_URL, defaultHeader } from "../../../shared/api/api";
import type { AuthType, SigninRequest, SignupRequest } from "../types/auth";

export const signup = async (
    request: SignupRequest
): Promise<AuthType> => {
    const res = await fetch(`${BASE_APP_URL}/signup`, {
        method: 'POST',
        headers: {
            ...defaultHeader
        },
        body: JSON.stringify(request)
    });

    return res.json();
}

export const signin = async (
    request: SigninRequest
): Promise<AuthType> => {
    const res = await fetch(`${BASE_APP_URL}/signin`, {
        method: 'POST',
        headers: {
            ...defaultHeader
        },
        body: JSON.stringify(request)
    });
    const data: AuthType = await res.json();
    localStorage.setItem('authToken', data.token);

    return data;
}

export const checkEntication = async (): Promise<AuthType | null> => {
    const token = localStorage.getItem('authToken');
    if (!token) return null;

    const res = await fetch(`${BASE_APP_URL}/authentication`, {
        method: 'POST',
        headers: {
            ...defaultHeader,
            'Authorization': `Bearer ${token}`
        }
    });

    return res.json();
}