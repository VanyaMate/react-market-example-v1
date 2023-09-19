import { ShoppingCartOutlined } from '@ant-design/icons';
import css from './cart-header.module.scss';
import { Button } from 'antd';


const CartHeader = () => {
    return (
        <div className={ css.container }>
            <Button
                type={ 'dashed' }
                size={ 'large' }
                className={ css.button }
            >
                <ShoppingCartOutlined className={ css.icon }/>
            </Button>
        </div>
    );
};

export default CartHeader;