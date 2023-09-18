import authLocalStorageService
    from '@/services/auth/auth-local-storage.service.ts';
import AuthForm from '@/components/forms/auth-form/auth-form.tsx';


const AuthPage = () => {
    return (
        <div>
            <AuthForm
                authService={ authLocalStorageService }
                onLogin={ (data) => console.log(data) }
                onErrorLogin={ (message) => console.log('Error', message) }
            />
        </div>
    );
};

export default AuthPage;