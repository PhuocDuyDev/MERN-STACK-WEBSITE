import React, { useState } from 'react';
import styles from './SelectPaymentMethod.module.css';
import arrowImg from '../../assets/icons/arrow.png';
import { notifyWarning } from '../../utils/toast';
import { useOutsideClick } from './../../hooks/';

const SelectPaymentMethod = ({
    label = '',
    selectHandler = () => {},
    selected = '',
    listOption = [],
}) => {
    const [active, setActive] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const paymentNotAcceptForNow = ['Credit Card'];

    const handleClickOutside = () => {
        setActive(false);
    };

    const ref = useOutsideClick(handleClickOutside);

    return (
        <div className={styles['select']}>
            <h3 className={styles['label']}>{label}</h3>
            <div
                className={`${styles['select-menu']} ${
                    active ? styles['active'] : ''
                }`}
                onClick={() => setActive(!active)}
                ref={ref}
            >
                <div className={styles['selected']}>
                    <h3>
                        {selected ? selected : `Select ${label.toLowerCase()}`}
                    </h3>
                    <img src={arrowImg} alt='icon' />
                </div>
                <ul
                    className={`${styles['dropdown-menu']} ${
                        active ? styles['active'] : ''
                    }`}
                >
                    {listOption.map((option, index) => (
                        <li
                            key={index}
                            className={`${styles['dropdown-item']} ${
                                !(selectedOption === option)
                                    ? ''
                                    : styles['active']
                            } ${
                                !paymentNotAcceptForNow.includes(option)
                                    ? ''
                                    : styles['disable']
                            }`}
                            onClick={
                                !paymentNotAcceptForNow.includes(option)
                                    ? (event) => {
                                          event.stopPropagation();
                                          selectHandler(option);
                                          setSelectedOption(option);
                                          setActive(false);
                                      }
                                    : () => {
                                          notifyWarning(
                                              'We are currently working on improving this feature. Please try again later!',
                                              5
                                          );
                                      }
                            }
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SelectPaymentMethod;
