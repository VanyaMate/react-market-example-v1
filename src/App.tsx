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


const App = () => {
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