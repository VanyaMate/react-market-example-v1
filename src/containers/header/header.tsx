import { Space, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';
import CategoryHeader
    from '@/components/catalogue-header/catalogue-header.tsx';
import { useEffect, useState } from 'react';
import categoryService from '@/services/category/category.service.ts';


const Header = () => {
    const [ categories, setCategories ] = useState<string[]>([]);
    const [ loading, setLoading ]       = useState<boolean>(false);
    const props                         = useParams<{ category: string }>();

    useEffect(() => {
        setLoading(true);
        categoryService
            .getAll()
            .then((list) => setCategories(list))
            .finally(() => setLoading(false));
    }, []);

    return (
        <Space size={ 10 }>
            <Typography.Title style={ { margin: 0 } }>
                <Link to={ '/' }>Market</Link>
            </Typography.Title>
            <CategoryHeader
                categories={ categories }
                loading={ loading }
                selected={ props.category ?? 'Каталог' }
            />
        </Space>
    );
};

export default Header;