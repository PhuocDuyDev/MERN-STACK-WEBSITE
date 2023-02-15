import React from 'react';
import styles from './FeaturedProduct.module.css';
import { Link } from 'react-router-dom';
import { PRODUCTS_PAGE } from './../../../../const/NavigateConst';
import { Rating } from 'react-simple-star-rating';
import {
    BsEye,
    BsSuitHeart,
    BsSuitHeartFill,
    BsHandbag,
    BsHandbagFill,
} from 'react-icons/bs';
import product1a from '../../../../assets/images/product-1-1.jpg';
import product1b from '../../../../assets/images/product-1-2.jpg';
import product2a from '../../../../assets/images/product-2-1.jpg';
import product2b from '../../../../assets/images/product-2-2.jpg';
import product3a from '../../../../assets/images/product-3-1.jpg';
import product3b from '../../../../assets/images/product-3-2.jpg';

// const initialValue = {
//     cartList: [],
//     favouriteList: [],
// };

// const productReducer = (state, action) => {
//     if (action.type === 'ADD_TO_CART') {
//         if (state.cartList.some((product) => product.id === action.payload)) {
//             const indexExistProduct = state.cartList.findIndex(
//                 (product) => product.id === action.payload
//             );
//             const updatedCartList = [...state.cartList];
//             updatedCartList[indexExistProduct].quantity += 1;
//             return {
//                 ...state,
//                 cartList: [...updatedCartList],
//             };
//         }
//         return {
//             ...state,
//             cartList: [...state.cartList, { id: action.payload, quantity: 1 }],
//         };
//     }
//     if (action.type === 'TOGGLE_FAVOURITE') {
//         if (state.favouriteList.includes(action.payload)) {
//             state.favouriteList = state.favouriteList.filter(
//                 (id) => id != action.payload
//             );
//             return {
//                 ...state,
//             };
//         }
//         return {
//             ...state,
//             favouriteList: [...state.favouriteList, action.payload],
//         };
//     }
// };

const FeaturedProduct = () => {
    // const [product, dispatch] = useReducer(productReducer, initialValue);

    // const handleAddToCart = (e) => {
    //     e.preventDefault();
    //     const buttonEle = e.target.closest('button');

    //     dispatch({
    //         type: 'ADD_TO_CART',
    //         payload: buttonEle.dataset.productId,
    //     });
    // };

    // const handleToggleFavourite = (e) => {
    //     e.preventDefault();
    //     const buttonEle = e.target.closest('button');

    //     dispatch({
    //         type: 'TOGGLE_FAVOURITE',
    //         payload: buttonEle.dataset.productId,
    //     });
    // };

    // const handleQuickViewProduct = (e) => {
    //     e.preventDefault();
    // };

    return (
        <section className={`${styles['featured-section']} section`}>
            <div className={`container ${styles['featured']}`}>
                <h1 className='section-heading'>Featured Collection</h1>
                <div className={`grid ${styles['featured-products']}`}>
                    {new Array(8).fill(0).map((_, index) => {
                        let product = [product1a, product1b]
                        if(index % 3 == 0) {
                            product = [product2a, product2b]
                        } else if (index % 3 == 1) {
                            product = [product3a, product3b]
                        }
                        return (
                            <div
                                key={index}
                                className={styles['product-container']}
                            >
                                <Link
                                    to={`${PRODUCTS_PAGE}/:id`}
                                    className={`${styles['product-card']}`}
                                >
                                    <div className={styles['product-img']}>
                                        <img
                                            src={product[0]}
                                            alt='watch front'
                                        />
                                        <img src={product[1]} alt='watch 2' />
                                    </div>
                                    <div className={styles['product-details']}>
                                        <p
                                            className={
                                                styles['product-details-tag']
                                            }
                                        >
                                            tag
                                        </p>
                                        <h4
                                            className={
                                                styles['product-details-title']
                                            }
                                        >
                                            T-Shirt Thailand brand MW T-Shirt
                                            Thailand brand MW
                                        </h4>
                                        <Rating
                                            initialValue={Math.random() * 1 + 4}
                                            allowFraction={true}
                                            size={'2.4rem'}
                                            readonly={true}
                                            titleSeparator='/'
                                        />
                                        <div
                                            className={
                                                styles['product-details-price']
                                            }
                                        >
                                            <span
                                                className={
                                                    styles[
                                                        'product-details-price-sale'
                                                    ]
                                                }
                                            >
                                                $199
                                            </span>
                                            <span
                                                className={
                                                    styles[
                                                        'product-details-price-original'
                                                    ]
                                                }
                                            >
                                                $299
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        className={
                                            styles['product-card-actions']
                                        }
                                    >
                                        {/* {product.cartList.includes(
                                            index.toString()
                                        ) ? (
                                            <button
                                                className={styles['action-btn']}
                                                data-product-id={index}
                                                onClick={handleAddToCart}
                                            >
                                                <BsHandbagFill
                                                    className={`${styles['action-icon']} ${styles['active']}`}
                                                />
                                            </button>
                                        ) : (
                                            <button
                                                className={styles['action-btn']}
                                                data-product-id={index}
                                                onClick={handleAddToCart}
                                            >
                                                <BsHandbag
                                                    className={`${styles['action-icon']}`}
                                                />
                                            </button>
                                        )} */}
                                        <button
                                            className={styles['action-btn']}
                                            data-product-id={index}
                                            // onClick={handleAddToCart}
                                        >
                                            <BsHandbag
                                                className={`${styles['action-icon']}`}
                                            />
                                        </button>
                                        <button
                                            className={styles['action-btn']}
                                            // onClick={handleQuickViewProduct}
                                        >
                                            <BsEye
                                                className={
                                                    styles['action-icon']
                                                }
                                            />
                                        </button>
                                    </div>
                                    <button
                                        data-product-id={index}
                                        className={`${styles['product-card-favourite']}`}
                                    >
                                        {/* {product.favouriteList.includes(
                                            index.toString()
                                        ) ? (
                                            <BsSuitHeartFill
                                                className={`${styles['favourite-icon']} ${styles['active']}`}
                                                onClick={handleToggleFavourite}
                                                data-product-id={index}
                                            />
                                        ) : (
                                            <BsSuitHeart
                                                className={styles['favourite-icon']}
                                                onClick={handleToggleFavourite}
                                                data-product-id={index}
                                            />
                                        )} */}
                                        <BsSuitHeart
                                            className={styles['favourite-icon']}
                                            // onClick={handleToggleFavourite}
                                            data-product-id={index}
                                        />
                                    </button>
                                </Link>
                                <div className={styles['product-card-badget']}>
                                    -40%
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProduct;
