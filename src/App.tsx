import React, { useEffect, useState } from 'react';
import { IProduct } from './services/product/product.interface.ts';
import productDummyService from './services/product/product-dummy.service.ts';
import { Category } from './services/category/category.interface.ts';
import categoryService from './services/category/category.service.ts';


const Product: React.FC<IProduct> = (product: IProduct) => {
    return (
        <div>
            <img style={ { width: '130px', height: '130px' } }
                 src={ product.thumbnail }/>
            <p>{ product.category }</p>
            <h2>{ product.title }</h2>
            <p>{ product.description }</p>
            <h3>{ product.price } $</h3>
        </div>
    );
};

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
            select: [ 'title', 'price', 'images', 'thumbnail', 'description' ],
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
                product
                ? <Product { ...product }/>
                : ''
            }
            <hr/>
            <h2>products</h2>
            {
                products.map((product) => <Product
                    key={ product.id } { ...product }/>)
            }
            <hr/>
            <h2>search products</h2>
            {
                searchProducts.map((product) => <Product
                    key={ product.id } { ...product }/>)
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
                categoryProducts.map((product) => <Product
                    key={ product.id } { ...product }/>)
            }
        </div>
    );
};

export default App;