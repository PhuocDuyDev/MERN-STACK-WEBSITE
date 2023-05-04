import React, { useState } from 'react';
import styles from './SelectAddressCustome.module.css';
import arrowImg from '../../assets/icons/arrow.png';
import { useOutsideClick } from './../../hooks/';

const SelectAddressCustome = ({
    label = '',
    selectHandler = () => {},
    selected = '',
    listOption = [],
}) => {
    const [active, setActive] = useState(false);
    const [selectedCode, setSelectedCode] = useState(-1);

    const handleClickOutside = () => {
        setActive(false);
    };

    const ref = useOutsideClick(handleClickOutside);

    const listOptionFormat = listOption.map((option) => {
        const name = option.name.replace(
            /(Thành phố |Thành Phố |Tỉnh |Quận |Huyện |Thị xã |Thị Xã |Xã |Thị trấn |Phường )/g,
            ''
        );
        return { ...option, name };
    });

    return (
        <div className={styles['select']} ref={ref}>
            <h3 className={styles['label']}>{label}</h3>
            <div
                className={`${styles['select-menu']} ${
                    active ? styles['active'] : ''
                }`}
                onClick={() => setActive(!active)}
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
                    {listOptionFormat.length > 0 ? (
                        listOptionFormat.map((option, index) => (
                            <li
                                key={option.code || index}
                                className={`${styles['dropdown-item']} ${
                                    selectedCode === option.code
                                        ? styles['active']
                                        : ''
                                }`}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    selectHandler(option.code);
                                    setSelectedCode(option.code);
                                    setActive(false);
                                }}
                            >
                                {option.name}
                            </li>
                        ))
                    ) : label == 'district' ? (
                        <span>Please select city</span>
                    ) : (
                        (label = 'ward' ? (
                            <span>Please select district</span>
                        ) : null)
                    )}
                </ul>
            </div>
        </div>
    );
};

export default SelectAddressCustome;
