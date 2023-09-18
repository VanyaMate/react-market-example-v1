import React from 'react';
import { Tooltip } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import css from './product-card-action.module.scss';


export interface IProductCardActionAddToWishlistProps extends React.HTMLAttributes<HTMLDivElement> {
    onAddToWishlist: () => any;
}

const ProductCardActionAddToWishlist: React.FC<IProductCardActionAddToWishlistProps> = (props) => {
    return (
        <Tooltip placement={ 'top' }
                 title={ 'Добавить в избранное' }
        >
            <HeartOutlined
                className={ css.action }
                onClick={ props.onAddToWishlist }
            />
        </Tooltip>
    );
};

export default ProductCardActionAddToWishlist;