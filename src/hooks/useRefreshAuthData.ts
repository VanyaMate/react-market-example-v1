import { useEffect, useMemo, useState } from 'react';
import { IUser } from '../store/user/user.interfaces.ts';
import { ICart } from '../store/cart/cart.interfaces.ts';
import { IUserService } from '../store/user/user-local-storage.service.ts';
import { ICartService } from '../store/cart/cart-local-storage.service.ts';
import { useActions } from './redux/useActions.ts';
import { useSlice } from './redux/useSlice.ts';


export interface IAuthData {
    user: IUser | null;
    cart: ICart;
}

export interface IUseRefreshAuthData {
    login: boolean;
    error: boolean;
    data: IAuthData;
}


export const useRefreshAuthData = function (
    userService: IUserService,
    cartService: ICartService,
) {
    const [ loading, setLoading ]                  = useState<boolean>(false);
    const [ error, setError ]                      = useState<boolean>(false);
    const { user: userActions, cart: cartActions } = useActions();
    const { user: userSlice, cart: cartSlice }     = useSlice((state) => state);
    const data                                     = useMemo<IAuthData>(() => {
        return {
            user: userSlice.user,
            cart: cartSlice.cart,
        };
    }, [ userSlice.user, cartSlice.cart ]);


    useEffect(() => {
        if (userService.loading) return;

        setLoading(true);
        setError(false);
        userService
            .getCurrentUser()
            .then((user) => {
                if (user) {
                    userActions.setUser(user);
                    cartService
                        .findOne(user.login)
                        .then((cart) => {
                            if (cart) {
                                cartActions.setCart(cart);
                            } else {
                                cartService
                                    .create({ userLogin: user.login })
                                    .then((cart) => cartActions.setCart(cart));
                            }
                        });
                } else {
                    userActions.resetUser();
                }
            })
            .catch((_) => {
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { loading, error, data };
};