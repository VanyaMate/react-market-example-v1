import React, {
    ChangeEvent,
    KeyboardEvent,
    useCallback,
    useState,
} from 'react';
import { Input } from 'antd';


export interface ISearchHeader {
    onEnter: (search: string) => void;
}

const SearchHeader: React.FC<ISearchHeader> = (props) => {
    const [ search, setSearch ] = useState<string>('');
    const onChange              = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }, [ search ]);
    const onKeyDown             = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.onEnter(search);
        }
    }, [ search ]);

    return (
        <div>
            <Input
                size={ 'large' }
                onChange={ onChange }
                onKeyDown={ onKeyDown }
                placeholder={ 'Поиск' }
            />
        </div>
    );
};

export default React.memo(SearchHeader);