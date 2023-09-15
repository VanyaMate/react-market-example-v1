import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootStore } from '../../store/index.store.ts';


export const useSlice: TypedUseSelectorHook<RootStore> = useSelector;