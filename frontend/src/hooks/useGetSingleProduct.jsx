import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useGetProductById } from '../operations/queries';
import { categoriesProductsPage } from '../const';
import { useNavigate, useParams } from 'react-router-dom';
import { useAddToCartMutation } from '../operations/mutations';
import { notifySuccess, notifyWarning } from '../utils/toast';
import { useAuthContext } from '../context/AuthContext';

const useGetSingleProduct = () => {
    const { setCurrentUser } = useAuthContext();
    const { mutate: addToCartHandler } = useAddToCartMutation();
    const { productId } = useParams();
    const { data, loading, error } = useGetProductById(productId);
    const [quantityInput, setQuantityInput] = useState(1);
    const [sizeSelect, setSizeSelect] = useState('S');
    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();
        const fetchProductDetails = async () => {
            try {
                await refetch({ productId }, { signal: controller.signal });
            } catch (error) {
                if (error.name === 'AbortError') {
                    // The request was aborted
                } else {
                    // Handle other errors
                }
            }
        };

        fetchProductDetails();

        // Abort the ongoing request when the component unmounts
        return () => {
            controller.abort();
        };
    }, [productId]);

    const quantityOfSize = useMemo(
        () =>
            data?.product.size.items.filter(({ size }) => {
                return size === sizeSelect;
            })[0].quantity,
        [data, sizeSelect]
    );

    const sizeChangeHandler = useCallback(
        (sizeSelect) => {
            setSizeSelect(sizeSelect);
            const [sizeInfo] = data?.product.size.items.filter(({ size }) => {
                return size === sizeSelect;
            });
            if (sizeInfo.quantity === 0) {
                setQuantityInput(0);
            } else {
                setQuantityInput(1);
            }
        },
        [data]
    );

    const quantityChangeHandler = useCallback((event) => {
        if (event.target.value > quantityOfSize) {
            setQuantityInput(quantityOfSize);
        } else {
            setQuantityInput(event.target.value);
        }
    }, []);

    const quantityDecreaseHandler = () => {
        if (quantityInput <= 1) {
            setQuantityInput(1);
        } else {
            setQuantityInput((quantity) => quantity - 1);
        }
    };
    const quantityIncreaseHandler = () => {
        if (quantityInput >= quantityOfSize) {
            setQuantityInput(quantityOfSize);
        } else {
            setQuantityInput((quantity) => quantity + 1);
        }
    };
    const handleAddToCart = async (event, inputProductCart) => {
        event.preventDefault();
        const { productId, quantity, size, isEditQuantity } = inputProductCart;

        try {
            if (+quantity <= 0) {
                throw new Error('Product out of stocks');
            }
            const data = await addToCartHandler({
                variables: {
                    inputProduct: {
                        productId,
                        quantity: +quantity,
                        size: size,
                        isEditQuantity: isEditQuantity,
                    },
                },
            });

            setCurrentUser(data.data.addToCart);
            notifySuccess('Added success product to cart!');
            // setAddCartSuccess(true);
        } catch (error) {
            if (error?.extensions?.http?.status === 401) {
                notifyWarning('Please login to use this feature!');

                // setTimeout(() => navigate('/login'), 500);
                return;
            }
            // setAddCartSuccess(false);
            notifyWarning(error.message);
            return error;
        }
    };

    const [categoryBreadcum] = categoriesProductsPage.filter(
        ({ category }) => category === data?.product.category
    );

    return {
        product: data?.product,
        loading: loading,
        error: error?.graphQLErrors[0],
        categoryBreadcum,
        quantityInput,
        sizeSelect,
        quantityOfSize,
        quantityChangeHandler,
        quantityDecreaseHandler,
        quantityIncreaseHandler,
        sizeChangeHandler,
        handleAddToCart,
    };
};

export default useGetSingleProduct;
