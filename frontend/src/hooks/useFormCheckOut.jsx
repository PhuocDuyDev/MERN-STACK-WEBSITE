import { useEffect, useMemo, useState } from 'react';
import validator from 'validator';

const useFormCheckOut = () => {
    const [listProvince, setListProvince] = useState([]);
    const [listDistrict, setListDistrict] = useState([]);
    const [listWard, setListWard] = useState([]);
    const listPaymentMethod = useMemo(() => ['Cash', 'Credit Card']);
    const listOrderConfirmMethod = useMemo(() => ['Phone', 'Email']);

    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [selectedOrderConfirmMethod, setSelectedOrderConfirmMethod] =
        useState('');

    const [name, setName] = useState('');
    const [nameIsValid, setNameIsValid] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberIsvalid, setPhoneNumberIsValid] = useState(null);

    useEffect(() => {
        const apiProvinces = 'https://provinces.open-api.vn/api/?depth=3';
        const getProvinces = async () => {
            const response = await fetch(apiProvinces);
            const listProvince = await response.json();

            setListProvince(listProvince);
        };
        getProvinces();
    }, []);

    const selectProvinceHandler = (provinceCode) => {
        const [provinceSelected] = listProvince.filter(
            (province) => province.code === provinceCode
        );
        setSelectedProvince(provinceSelected.name);
        setListDistrict(provinceSelected.districts);
        setListWard([]);
        setSelectedDistrict('');
        setSelectedWard('');
    };

    const selectDistrictHandler = (districtCode) => {
        const [districtSelected] = listDistrict.filter(
            (district) => district.code === districtCode
        );
        setSelectedDistrict(districtSelected.name);
        setListWard(districtSelected.wards);
        setSelectedWard('');
    };

    const selectWardHandler = (wardCode) => {
        const [wardSelected] = listWard.filter(
            (ward) => ward.code === wardCode
        );
        setSelectedWard(wardSelected.name);
    };

    const selectPaymentMethodHandler = (paymentMethodSelected) => {
        const [paymentMethod] = listPaymentMethod.filter(
            (paymentMethod) => paymentMethod === paymentMethodSelected
        );
        setSelectedPaymentMethod(paymentMethod);
    };

    const selectOrderConfirmMethodHandler = (orderConfirmSelected) => {
        const [orderConfirm] = listOrderConfirmMethod.filter(
            (orderConfirm) => orderConfirm === orderConfirmSelected
        );
        setSelectedOrderConfirmMethod(orderConfirm);
    };

    const nameChangeHandler = (event) => {
        setName(event.target.value);
    };

    const validateName = () => {
        setNameIsValid(
            validator.isLength(name.trim(), {
                min: 6,
            })
        );
    };

    const phoneNumberChangeHandler = (event) => {
        setPhoneNumber(event.target.value);
    };

    function isVietnamesePhoneNumber(number) {
        setPhoneNumberIsValid(
            /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(number)
        );
    }

    return {
        listProvince,
        listDistrict,
        listWard,
        listPaymentMethod,
        listOrderConfirmMethod,
        selectedProvince,
        selectedDistrict,
        selectedWard,
        selectedPaymentMethod,
        selectedOrderConfirmMethod,
        selectProvinceHandler,
        selectDistrictHandler,
        selectWardHandler,
        selectPaymentMethodHandler,
        selectOrderConfirmMethodHandler,
        name,
        phoneNumber,
        nameIsValid,
        phoneNumberIsvalid,
        nameChangeHandler,
        phoneNumberChangeHandler,
        validateName,
        validatePhoneNumber: isVietnamesePhoneNumber,
    };
};

export default useFormCheckOut;
