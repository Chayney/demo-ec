import { apiClient } from "../../../shared/api/apiClient";
import type { ProfileAddressRequest, ProfileEditRequest, ProfileInfo, ProfilePayRequest, ProfileType } from "../types/profile";

export const getMypage = async (): Promise<ProfileInfo> => {
    return await apiClient<ProfileInfo>('/mypage', { method: 'GET' });
}

// プロフィール編集画面
export const getProfilepage = async (): Promise<ProfileType> => {
    return await apiClient<ProfileType>('/edit', { method: 'GET' });
}

export const editProfile = async(
    request: ProfileEditRequest
): Promise<ProfileType> => {
    return await apiClient<ProfileType>('/edit', {
        method: 'PUT',
        body: JSON.stringify(request)
    });
}

// 画像アップロード
export const uploadProfileImage = async (formData: FormData): Promise<{ path: string }> => {
    const data = await apiClient<{ path: string }>('/upload', {
        method: 'POST',
        body: formData,
        // Content-Typeはブラウザが自動でmultipart/form-dataを設定
    });

    // DB保存用の相対パスのみ返す
    // images/xxxx.jpg
    return {
        path: data.path
    };
};

// 住所変更か支払方法変更ページの分岐
type ProfileFetchType = 'address' | 'pay';
export const getProfile = async (type: ProfileFetchType): Promise<ProfileType> => {
    const path = type === 'address' ? '/address' : '/pay';
    return await apiClient<ProfileType>(path, { method: 'GET' });
}

export const editProfileAddress = async(
    request: ProfileAddressRequest
): Promise<ProfileType> => {
    return await apiClient<ProfileType>('/address', {
        method: 'PUT',
        body: JSON.stringify(request)
    });
}

export const editProfilePay = async (
    request: ProfilePayRequest
): Promise<ProfileType> => {
    return await apiClient<ProfileType>('/pay', {
        method: 'PUT',
        body: JSON.stringify(request)
    });
}