import { IAuthData, IAuthService } from '@/services/auth/auth.interface.ts';
import { useEffect, useState } from 'react';


export interface IUseAuthRefreshProps {
    authService: IAuthService;
    onLogin: (data: IAuthData) => void;
    onError: (message: string) => void;
}

export const useAuthRefresh = function (props: IUseAuthRefreshProps) {
    const [ refreshed, setRefreshed ] = useState<boolean>(false);
    const [ loading, setLoading ]     = useState<boolean>(false);

    useEffect(() => {
        if (refreshed || loading) return;

        setLoading(true);
        props.authService
            .refresh()
            .then(props.onLogin)
            .catch(props.onError)
            .finally(() => {
                setLoading(false);
                setRefreshed(true);
            });
    }, []);
};