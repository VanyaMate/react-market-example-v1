import React, { useMemo } from 'react';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';


export interface ICatalogueHeader {
    categories: string[];
    loading: boolean;
    selected: string;
    onSelect: (catalogue: string) => void;
}

const CataloguesHeader: React.FC<ICatalogueHeader> = (props) => {
    const items = useMemo<MenuProps['items']>(() => {
        return props.categories.map((catalogue) => {
            return {
                label   : catalogue,
                key     : catalogue,
                disabled: catalogue === props.selected,
            };
        });
    }, [ props.categories, props.selected ]);

    const menu = useMemo<MenuProps>(() => {
        return {
            items  : items,
            onClick: (item) => {
                props.onSelect(item.key);
            },
        };
    }, [ items ]);

    return (
        <Dropdown.Button
            icon={ <DownOutlined/> }
            loading={ props.loading }
            disabled={ props.loading }
            menu={ menu }
            size={ 'large' }
        >
            { props.selected }
        </Dropdown.Button>
    );
};

export default React.memo(CataloguesHeader);