import { apiClient } from "../../../shared/api/apiClient";
import type { ProfileAddressRequest, ProfileType } from "../types/profile";

export const getProfile = async (): Promise<ProfileType> => {
    return await apiClient<ProfileType>('/address', { method: 'GET' });
}

export const editProfileAddress = async(
    request: ProfileAddressRequest
): Promise<ProfileType> => {
    return await apiClient<ProfileType>('/address', {
        method: 'PUT',
        body: JSON.stringify(request)
    });
}