import { useQuery } from '@apollo/client';
import React from 'react';
import { CURRENTUSER_QUERY } from '../../utils/mutation';

const Cart = () => {
    const { loading, error, data } = useQuery(CURRENTUSER_QUERY);

    if (loading) return <h1>Loading cart</h1>;
    return data ? <div>{data?.currentUser.name}</div> : <div>cart</div>;
};

export default Cart;
