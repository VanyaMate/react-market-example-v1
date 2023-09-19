import { Space, Typography } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CategoryHeader
    from '@/components/header/catalogue-header/catalogue-header.tsx';
import React, { useCallback, useEffect, useState } from 'react';
import css from './header.module.scss';
import { ICategoryService } from '@/services/category/category.interface.ts';
import SearchHeader from '@/components/header/search-header/search-header.tsx';
import CartHeader from '@/components/header/cart-header/cart-header.tsx';
import ProfileHeader
    from '@/components/header/profile-header/profile-header.tsx';


export interface IHeaderProps {
    categoryService: ICategoryService;
}

const Header: React.FC<IHeaderProps> = (props) => {
    const [ categories, setCategories ] = useState<string[]>([]);
    const [ loading, setLoading ]       = useState<boolean>(false);
    const params                        = useParams<{ category: string }>();
    const navigate                      = useNavigate();
    const onCategorySelect              = useCallback((category: string) => {
        navigate('/products/' + category);
    }, []);
    const onSearch                      = useCallback((search: string) => {
        navigate('/products?search=' + search);
    }, []);

    useEffect(() => {
        setLoading(true);
        props.categoryService
            .getAll()
            .then((list) => setCategories(list))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className={ css.container }>
            <Space size={ 10 } className={ css.content }>
                <div className={ css.left }>
                    <Space
                        size={ 10 }
                    >
                        <Typography.Title style={ { margin: 0 } }>
                            <Link to={ '/' }>Market</Link>
                        </Typography.Title>
                        <CategoryHeader
                            categories={ categories }
                            loading={ loading }
                            selected={ params.category ?? 'Каталог' }
                            onSelect={ onCategorySelect }
                        />
                        <SearchHeader
                            onEnter={ onSearch }
                        />
                    </Space>
                </div>
                <div className={ css.right }>
                    <Space
                        size={ 10 }
                    >
                        <ProfileHeader/>
                        <CartHeader/>
                    </Space>
                </div>
            </Space>
        </div>
    );
};

export default Header;