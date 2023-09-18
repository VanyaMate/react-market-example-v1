import { Button, Checkbox, Divider, Form, Input } from 'antd';
import { IAuthData, IAuthService } from '@/services/auth/auth.interface.ts';
import React, { useCallback, useState } from 'react';
import FormContainer from '@/components/forms/form-container.tsx';
import {
    IAuthStorageService,
} from '@/services/storage/auth/auth-local-storage-database.interface.ts';


type LoginFormType = {
    login?: string;
    password?: string;
    remember?: boolean;
}


export interface ILoginFormProps {
    authService: IAuthService;
    authStorageService: IAuthStorageService;
    onLogin: (data: IAuthData) => void;
    onError: (message: string) => void;
}

const LoginForm: React.FC<ILoginFormProps> = (props) => {
    const [ loading, setLoading ] = useState<boolean>(false);
    const onFinish                = useCallback((data: Required<LoginFormType>) => {
        setLoading(true);
        props.authService.login(data.login, data.password)
            .then(props.onLogin)
            .then(() => {
                if (data.remember) {
                    props.authStorageService.set(data.login);
                } else {
                    props.authStorageService.reset();
                }
            })
            .catch(props.onError)
            .finally(() => setLoading(false));
    }, [ props.authService ]);

    return (
        <FormContainer>
            <Divider>Login form</Divider>
            <Form
                name={ 'login' }
                labelCol={ { span: 8 } }
                wrapperCol={ { span: 16 } }
                style={ { maxWidth: '500px' } }
                initialValues={ { login: '', password: '', remember: false } }
                onFinish={ onFinish }
            >
                <Form.Item<LoginFormType>
                    label={ 'login' }
                    name={ 'login' }
                    rules={ [ { required: true, message: 'Введите логин' } ] }
                >
                    <Input/>
                </Form.Item>

                <Form.Item<LoginFormType>
                    label={ 'password' }
                    name={ 'password' }
                    rules={ [ { required: true, message: 'Введите пароль' } ] }
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item<LoginFormType>
                    valuePropName={ 'checked' }
                    name={ 'remember' }
                    wrapperCol={ { offset: 8, span: 16 } }
                >
                    <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={ { offset: 8 } }
                    labelCol={ { span: 8 } }
                >
                    <Button type={ 'primary' } htmlType={ 'submit' }
                            loading={ loading }>
                        { loading ? 'Вход' : 'Войти' }
                    </Button>
                </Form.Item>
            </Form>
        </FormContainer>
    );
};

export default LoginForm;