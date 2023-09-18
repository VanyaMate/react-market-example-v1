import React, { ReactNode, useMemo } from 'react';
import { Divider } from 'antd';
import css from './product-card-actions.module.scss';


export interface IProductCardActions extends React.HTMLAttributes<HTMLDivElement> {
    actions: ReactNode[];
}

const ProductCardActions: React.FC<IProductCardActions> = (props) => {
    const actions = useMemo<ReactNode[]>(() => {
        const actions = [];
        for (let i = 0; i < props.actions.length; i++) {
            actions.push(props.actions[i]);
            if (props.actions[i + 1]) {
                actions.push(<Divider type={ 'vertical' }/>);
            }
        }
        return actions;
    }, [ props.actions ]);

    return (
        <div className={ css.container }>
            { actions }
        </div>
    );
};

export default ProductCardActions;