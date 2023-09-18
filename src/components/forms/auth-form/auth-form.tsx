import React, { useCallback, useMemo, useState } from 'react';
import { IAuthData, IAuthService } from '@/services/auth/auth.interface.ts';
import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/es/radio/interface';
import LoginForm from '@/components/forms/login-form/login-form.tsx';
import RegistrationForm
    from '@/components/forms/registration-form/registration-form.tsx';


export interface IAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
    authService: IAuthService;
    onLogin: (data: IAuthData) => void;
    onErrorLogin: (message: string) => void;
}

const AuthForm: React.FC<IAuthFormProps> = (props) => {
    const [ registration, setRegistration ] = useState<boolean>(false);
    const options                           = useMemo(() => {
        return [
            {
                label: 'Вход',
                value: false,
            },
            {
                label: 'Регистрация',
                value: true,
            },
        ];
    }, []);

    const onToggle = useCallback((e: RadioChangeEvent) => {
        setRegistration(e.target.value);
    }, [ registration ]);

    return (
        <div>
            <Radio.Group
                options={ options }
                onChange={ onToggle }
                value={ registration }
                optionType={ 'button' }
            />
            {
                registration
                ? <RegistrationForm
                    authService={ props.authService }
                    onLogin={ props.onLogin }
                    onError={ props.onErrorLogin }
                />
                : <LoginForm
                    authService={ props.authService }
                    onLogin={ props.onLogin }
                    onError={ props.onErrorLogin }
                />
            }
        </div>
    );
};

export default AuthForm;