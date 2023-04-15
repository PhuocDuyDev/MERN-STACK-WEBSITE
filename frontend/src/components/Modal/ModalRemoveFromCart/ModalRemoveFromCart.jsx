import React from 'react';
import ReactDom from 'react-dom';
import styles from './ModalRemoveFromCart.module.css';

const ModalRemoveFromCart = ({ open, onClose, removeFromCart }) => {
    if (!open) return null;

    return ReactDom.createPortal(
        <>
            <div className={styles['overlay']} onClick={onClose} />
            <div
                className={`container ${styles['modal-remove-from-cart']}`}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className={`${styles['modal-container']}`}>
                    <button
                        type='button'
                        onClick={onClose}
                        className={styles['btn-close']}
                    >
                        X
                    </button>
                    <h2 className='section-heading'>Are you sure?</h2>
                    <p>You are already to delete items from cart.</p>
                    <div className={styles['action']}>
                        <button
                            className={`${styles['btn-cancel']} btn`}
                            onClick={onClose}
                            type='button'
                        >
                            Cancel
                        </button>
                        <button
                            type='button'
                            className={`${styles['btn-cancel']} btn`}
                            onClick={() => {
                                removeFromCart();
                                onClose();
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById('portal')
    );
};

export default ModalRemoveFromCart;
