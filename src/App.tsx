import Header from './containers/header/header.tsx';
import Footer from './containers/footer/footer.tsx';
import css from './app.module.scss';
import { Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/home-page/home-page.tsx';
import AuthPage from '@/pages/auth-page/auth-page.tsx';
import CartPage from '@/pages/cart-page/cart-page.tsx';
import ProductPage from '@/pages/product-page/product-page.tsx';
import ProductsPage from '@/pages/products-page/products-page.tsx';
import Page404 from '@/pages/404-page/page404.tsx';
import categoryService from '@/services/category/category.service.ts';
import { useAuthRefresh } from '@/hooks/use-auth-refresh.ts';
import authLocalStorageService
    from '@/services/auth/auth-local-storage.service.ts';
import { useActions } from '@/hooks/redux/useActions.ts';


const App = () => {
    const { user } = useActions();

    useAuthRefresh({
        authService: authLocalStorageService,
        onLogin    : (data) => user.setUser(data.user),
        onError    : (message) => console.log('Error refresh', message),
    });

    return (
        <div className={ css.container }>
            <Routes>
                <Route path={ '/products/:category' }
                       element={
                           <Header
                               categoryService={ categoryService }
                           />
                       }
                />
                <Route path={ '*' }
                       element={
                           <Header
                               categoryService={ categoryService }
                           />
                       }
                />
            </Routes>
            <div className={ css.content }>
                <div className={ css.top }>
                    <Routes>
                        <Route path={ '/' } element={ <HomePage/> }/>
                        <Route path={ '/auth' } element={ <AuthPage/> }/>
                        <Route path={ '/cart' } element={ <CartPage/> }/>
                        <Route path={ '/product/:id' }
                               element={ <ProductPage/> }/>
                        <Route path={ '/products' }
                               element={ <ProductsPage/> }/>
                        <Route path={ '/products/:category' }
                               element={ <ProductsPage/> }/>
                        <Route path={ '*' } element={ <Page404/> }/>
                    </Routes>
                </div>
                <Footer/>
            </div>
        </div>
    );
};

export default App;