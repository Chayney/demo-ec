import { useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom"
import { useCheckEnticationQuery } from "./useCheckEnticationQuery";
import { useCallback, useEffect } from "react";
import type { UserType } from "../types/auth";
import { NAVIGATION_LIST } from "../../../shared/constants/navigation";

export const useAuth = () => {
    // アプリ全体で共有
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { data: authData, isLoading } = useCheckEnticationQuery();
    const user = authData?.user || null;
    const isAuth = !!authData?.user;

    // 認証判定用
    const { pathname } = useLocation();

    const signin = useCallback(
        (user: UserType, token: string) => {
            // キャッシュ保存
            queryClient.setQueryData(['auth'], { user, token });

            // localStorageにトークン保存
            localStorage.setItem('authToken', token);

            // TOP画面に遷移
            navigate(NAVIGATION_LIST.TOP);
        }, [navigate, queryClient]
    )

    const signout = useCallback(
        () => {
            // キャッシュ(キー)削除
            queryClient.removeQueries({ queryKey: ['auth'] });

            // localStorageのトークン削除
            localStorage.removeItem('authToken');

            // ログイン画面に遷移
            navigate(NAVIGATION_LIST.SIGNIN);
        }, [navigate, queryClient]
    )

    const checkEntication = useCallback(
        () =>  pathname === NAVIGATION_LIST.SIGNUP || pathname === NAVIGATION_LIST.SIGNIN, [pathname]
    )

    useEffect(() => {
        if (isLoading) return;

        // 未ログインでTOP画面に遷移出来ないよう制御
        if (!isAuth && !checkEntication()) navigate(NAVIGATION_LIST.SIGNIN);
        
        // ログイン済みでSignin画面に遷移出来ないよう制御
        if (isAuth && checkEntication()) navigate(NAVIGATION_LIST.TOP);
    })

    return {
        user,
        isAuth,
        isLoading,
        signin,
        signout
    }
}