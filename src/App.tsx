import { useRefreshAuthData } from './hooks/useRefreshAuthData.ts';
import userLocalStorageService
    from './store/user/user-local-storage.service.ts';
import cartLocalStorageService
    from './store/cart/cart-local-storage.service.ts';
import { useState } from 'react';


const App = () => {
    const {
              loading, error, data,
          } = useRefreshAuthData(userLocalStorageService, cartLocalStorageService);

    const [ login, setLogin ]       = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const loginHandler              = function () {
        userLocalStorageService.findOne(login);
    };

    return (
        <div>
            App
            <p>loading { loading.toString() }</p>
            <p>error { error.toString() }</p>
            <p>data { JSON.stringify(data) }</p>

            <hr/>
            <input type={ 'text' } placeholder={ 'login' }/>
            <input type={ 'password' } placeholder={ 'password' }/>
            <button>login</button>

            <hr/>
            <input type={ 'text' } placeholder={ 'login' }/>
            <input type={ 'password' } placeholder={ 'password' }/>
            <button>register</button>

            <hr/>
            <button>logout</button>
        </div>
    );
};

export default App;