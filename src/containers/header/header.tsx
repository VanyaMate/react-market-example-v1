import { Space, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';
import CategoryHeader
    from '@/components/catalogue-header/catalogue-header.tsx';
import React, { useEffect, useState } from 'react';
import css from './header.module.scss';
import { ICategoryService } from '@/services/category/category.interface.ts';


export interface IHeaderProps {
    categoryService: ICategoryService;
}

const Header: React.FC<IHeaderProps> = (props) => {
    const [ categories, setCategories ] = useState<string[]>([]);
    const [ loading, setLoading ]       = useState<boolean>(false);
    const params                        = useParams<{ category: string }>();

    useEffect(() => {
        setLoading(true);
        props.categoryService
            .getAll()
            .then((list) => setCategories(list))
            .finally(() => setLoading(false));
    }, []);

    return (
        <Space size={ 10 } className={ css.container }>
            <Typography.Title style={ { margin: 0 } }>
                <Link to={ '/' }>Market</Link>
            </Typography.Title>
            <CategoryHeader
                categories={ categories }
                loading={ loading }
                selected={ params.category ?? 'Каталог' }
            />
        </Space>
    );
};

export default Header;