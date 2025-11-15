import { renderHook, act } from '@testing-library/react';
import { useAuth } from './useAuth';
import { vi, describe, beforeEach, test, expect } from 'vitest';

// react-routerのnavigateをモック
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
}));

// QueryClientのモック
const mockSetQueryData = vi.fn();
const mockRemoveQueries = vi.fn();

vi.mock('@tanstack/react-query', () => ({
    useQueryClient: () => ({
        setQueryData: mockSetQueryData,
        removeQueries: mockRemoveQueries,
    }),
}));

// useCheckEnticationQueryをモック
vi.mock('./useCheckEnticationQuery', () => ({
    useCheckEnticationQuery: () => ({
        data: { user: { id: 1, name: 'test', email: 'test@example.com' }, token: 'abc123' },
        isLoading: false,
    }),
}));

// useAuthのテスト本体
describe('useAuth', () => {
    beforeEach(() => {
        // localStorageクリア
        localStorage.clear();
        // モック関数クリア
        mockNavigate.mockClear();
        mockSetQueryData.mockClear();
        mockRemoveQueries.mockClear();
    });

    test('signin()がlocalStorageにtokenを保存しnavigate(TOP)を呼ぶ', () => {
        const { result } = renderHook(() => useAuth());

        act(() => {
            result.current.signin({ id: 1, name: 'test', email: 'test@example.com' }, 'tokenXYZ');
        });

        // localStorageに保存されているか
        expect(localStorage.getItem('authToken')).toBe('tokenXYZ');

        // QueryClientのsetQueryDataが呼ばれたか
        expect(mockSetQueryData).toHaveBeenCalledWith(['auth'], {
            user: { id: 1, name: 'test', email: 'test@example.com' },
            token: 'tokenXYZ',
        });

        // navigateがTOPに遷移しているか
        // NAVIGATION_LIST.TOPに合わせる
        expect(mockNavigate).toHaveBeenCalledWith('/products');
        expect(mockNavigate).toHaveBeenCalledTimes(1);
    });

    test('signout()がlocalStorageを削除しnavigate(SIGNIN)を呼ぶ', () => {
        localStorage.setItem('authToken', 'aaa');

        const { result } = renderHook(() => useAuth());

        act(() => {
            result.current.signout();
        });

        // localStorageが削除されている
        expect(localStorage.getItem('authToken')).toBeNull();

        // QueryClientのremoveQueriesが呼ばれたか
        expect(mockRemoveQueries).toHaveBeenCalledWith({ queryKey: ['auth'] });

        // navigateがSIGNINに遷移しているか
        // NAVIGATION_LIST.SIGNINに合わせる
        expect(mockNavigate).toHaveBeenCalledWith('/signin');
        expect(mockNavigate).toHaveBeenCalledTimes(1);
    });

    test('useAuthがuser / isAuth / isLoadingを返す', () => {
        const { result } = renderHook(() => useAuth());

        expect(result.current.user).toEqual({ id: 1, name: 'test', email: 'test@example.com' });
        expect(result.current.isAuth).toBe(true);
        expect(result.current.isLoading).toBe(false);
    });
});
