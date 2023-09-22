import React from 'react';
import { Rate, Typography } from 'antd';
import css from './product-card-info.module.scss';
import { Link } from 'react-router-dom';
import ProductCardPrice
    from '@/components/product-card/product-card-price/product-card-price.tsx';


export interface IProductCardInfoProps extends React.HTMLAttributes<HTMLDivElement> {
    productId: number;
    rating: number;
    title: string;
    price: number;
    discount: number;
    description: string;
}

const ProductCardInfo: React.FC<IProductCardInfoProps> = (props) => {
    return (
        <div className={ css.container }>
            <div>
                <Typography.Text
                    type={ 'secondary' }
                    className={ css.id }
                >
                    id: { props.productId }
                </Typography.Text>
                <Rate value={ props.rating }/>
                <Typography.Title level={ 4 }>
                    <Link
                        to={ '/product/' + props.productId }>{ props.title }</Link>
                </Typography.Title>
                <Typography.Paragraph
                    ellipsis={ {
                        rows      : 3,
                        expandable: true,
                    } }
                >
                    { props.description }
                </Typography.Paragraph>
            </div>
            <ProductCardPrice
                price={ props.price }
                discountPercentage={ props.discount }
                currency={ '$' }
            />
        </div>
    );
};

export default React.memo(ProductCardInfo);