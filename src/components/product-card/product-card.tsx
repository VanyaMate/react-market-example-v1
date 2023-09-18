import React, { ReactNode, useMemo } from 'react';
import { IProduct } from '@/services/product/product.interface.ts';
import css from './product-card.module.scss';
import ProductCardSlider
    from '@/components/product-card/product-card-slider/product-card-slider.tsx';
import ProductCardInfo
    from '@/components/product-card/product-card-info/product-card-info.tsx';
import ProductCardActions
    from '@/components/product-card/product-card-actions/product-card-actions.tsx';
import ProductCardActionAddToCart
    from '@/components/product-card/product-card-actions/actions/product-card-action-add-to-cart.tsx';
import ProductCardActionAddToWishlist
    from '@/components/product-card/product-card-actions/actions/product-card-action-add-to-wishlist.tsx';


export interface IProductProps extends React.HTMLAttributes<HTMLDivElement> {
    product: IProduct;
    onAddToCart?: (product: IProduct) => void;
    onAddToWishlist?: (product: IProduct) => void;
}

const ProductCard: React.FC<IProductProps> = (props) => {
    const actions = useMemo<ReactNode[]>(() => {
        const actions = [];
        if (props.onAddToWishlist) {
            actions.push(<ProductCardActionAddToWishlist
                onAddToWishlist={ () => props.onAddToWishlist!(props.product) }
            />);
        }
        if (props.onAddToCart) {
            actions.push(
                <ProductCardActionAddToCart
                    onAddToCart={ () => props.onAddToCart!(props.product) }
                />,
            );
        }
        return actions;
    }, [ props.onAddToCart, props.onAddToWishlist ]);

    return (
        <div className={ css.container }>
            <div className={ css.top }>
                <ProductCardSlider
                    className={ css.image }
                    images={ props.product.images }
                    size={ [ 280, 280 ] }
                />
                <ProductCardInfo
                    productId={ props.product.id }
                    title={ props.product.title }
                    description={ props.product.description }
                    rating={ props.product.rating }
                    price={ props.product.price }
                />
            </div>
            <div className={ css.bottom }>
                <ProductCardActions
                    actions={ actions }
                />
            </div>
        </div>
    );
};

export default React.memo(ProductCard);