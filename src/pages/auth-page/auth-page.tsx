import authLocalStorageService
    from '@/services/auth/auth-local-storage.service.ts';
import AuthForm from '@/components/forms/auth-form/auth-form.tsx';
import { useActions } from '@/hooks/redux/useActions.ts';
import authLocalStorageDatabaseService
    from '@/services/storage/auth/auth-local-storage-database.service.ts';


const AuthPage = () => {
    const { user } = useActions();

    return (
        <div>
            <AuthForm
                authService={ authLocalStorageService }
                authStorageService={ authLocalStorageDatabaseService }
                onLogin={ (data) => {
                    user.setUser(data.user);
                } }
                onErrorLogin={ (message) => console.log('Error', message) }
            />
        </div>
    );
};

export default AuthPage;