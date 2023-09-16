import { useEffect, useState } from 'react';
import { IProduct } from './services/product/product.interface.ts';
import productDummyService from './services/product/product-dummy.service.ts';
import { Category } from './services/category/category.interface.ts';
import categoryService from './services/category/category.service.ts';


const App = () => {
    const [ product, setProduct ]                   = useState<IProduct | null>(null);
    const [ products, setProducts ]                 = useState<IProduct[]>([]);
    const [ searchProducts, setSearchProducts ]     = useState<IProduct[]>([]);
    const [ categories, setCategories ]             = useState<Category[]>([]);
    const [ currentCategory, setCurrentCategory ]   = useState<Category>('');
    const [ categoryProducts, setCategoryProducts ] = useState<IProduct[]>([]);
    useEffect(() => {
        categoryService.getAll().then(categories => setCategories(categories));

        productDummyService.getProduct(1).then((product) => setProduct(product));

        productDummyService.getProducts({
            limit : 10,
            offset: 0,
            select: [ 'title', 'price' ],
        })
            .then((data) => setProducts(data.products));

        productDummyService.getBySearch({
            title: 'iphone',
        }, {
            limit: 5,
        })
            .then((data) => setSearchProducts(data.products));
    }, []);

    useEffect(() => {
        if (currentCategory === '') {
            setCurrentCategory(categories[0] ?? '');
        }
    }, [ categories ]);

    useEffect(() => {
        if (currentCategory) {
            productDummyService.getByCategory(currentCategory, {
                limit: 10,
            })
                .then((data) => {
                    console.log(data);
                    setCategoryProducts(data.products);
                });
        }
    }, [ currentCategory ]);

    return (
        <div>
            App
            <hr/>
            <h2>product</h2>
            {
                product ?
                <div>product: { product.title } [{ product.price } rub]</div>
                        : ''
            }
            <hr/>
            <h2>products</h2>
            {
                products.map((product) =>
                    <div
                        key={ product.id }>product: { product.title } [{ product.price } rub]</div>)
            }
            <hr/>
            <h2>search products</h2>
            {
                searchProducts.map((product) =>
                    <div
                        key={ product.id }>product: { product.title } [{ product.price } rub]</div>)
            }

            <hr/>
            <ul>
                {
                    categories.map((category) => {
                        return <button key={ category }
                                       onClick={ () => setCurrentCategory(category) }>{ category }</button>;
                    })
                }
            </ul>
            <h2>category products</h2>
            {
                categoryProducts.map((product) =>
                    <div
                        key={ product.id }>product: { product.title } [{ product.price } rub]</div>)
            }
        </div>
    );
};

export default App;