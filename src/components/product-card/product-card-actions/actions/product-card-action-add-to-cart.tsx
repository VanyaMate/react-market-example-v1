import React from 'react';
import { Tooltip } from 'antd';
import css from './product-card-action.module.scss';
import { ShoppingCartOutlined } from '@ant-design/icons';


export interface IProductCardActionAddToCartProps extends React.HTMLAttributes<HTMLDivElement> {
    onAddToCart: () => any;
}

const ProductCardActionAddToCart: React.FC<IProductCardActionAddToCartProps> = (props) => {
    return (
        <Tooltip placement={ 'top' }
                 title={ 'Добавить в корзину' }
        >
            <ShoppingCartOutlined
                className={ css.action }
                onClick={ props.onAddToCart }
            />
        </Tooltip>
    );
};

export default ProductCardActionAddToCart;