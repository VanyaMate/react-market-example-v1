import React, { useMemo } from 'react';
import css from './product-card-price.module.scss';


export interface IProductCardPriceProps extends React.HTMLAttributes<HTMLDivElement> {
    price: number;
    discountPercentage: number;
    currency: string;
}

const ProductCardPrice: React.FC<IProductCardPriceProps> = (props) => {
    const price = useMemo(() => {
        return props.discountPercentage
               ? (props.price * (1 - props.discountPercentage / 100)).toFixed(2)
               : props.price.toFixed(2);
    }, [ props.price, props.discountPercentage ]);

    return (
        <div className={ css.container }>
            {
                props.discountPercentage && <div
                    className={ css.discount }>-{ props.discountPercentage }%
                </div>
            }
            <div className={ props.discountPercentage ? css.withDiscount : '' }>
                <span className={ css.currency }>{ props.currency }</span>
                <span className={ css.price }>
                    { price }
                </span>
            </div>
        </div>
    );
};

export default React.memo(ProductCardPrice);