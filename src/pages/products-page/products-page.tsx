import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IProduct } from '@/services/product/product.interface.ts';
import productDummyService
    from '@/services/product/local-data/product-local-data.service.ts';
import Product from '@/components/product-card/product-card.tsx';
import css from './products-page.module.scss';


const ProductsPage = () => {
    const params                    = useParams<{ category: string }>();
    const [ products, setProducts ] = useState<IProduct[]>([]);
    const [ _loading, setLoading ]  = useState<boolean>(false);
    const [ searchParams ]          = useSearchParams();

    useEffect(() => {
        setLoading(true);

        if (params.category) {
            productDummyService
                .getByCategory(params.category, { limit: 20 })
                .then((data) => setProducts(data.products))
                .finally(() => setLoading(false));
        } else {
            const search: string | null = searchParams.get('search');
            if (search) {
                productDummyService.getBySearch({ title: search }, { limit: 20 })
                    .then((data) => setProducts(data.products))
                    .finally(() => setLoading(false));
            } else {
                productDummyService
                    .getProducts({ limit: 20 })
                    .then((data) => setProducts(data.products))
                    .finally(() => setLoading(false));
            }
        }
    }, [ params ]);

    return (
        <div className={ css.container }>
            {
                products.map((product) =>
                    <Product
                        key={ product.id }
                        product={ product }
                        onAddToCart={ (product) => console.log('add to cart' +
                            ' product', product) }
                        onAddToWishlist={ (product) => console.log('add to' +
                            ' wishlist' +
                            ' product', product) }
                    />,
                )
            }
        </div>
    );
};

export default ProductsPage;