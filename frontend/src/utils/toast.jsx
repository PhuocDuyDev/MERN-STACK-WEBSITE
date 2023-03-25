import { toast } from 'react-toastify';
const TIME_DEFAULT = 1.5;
export const notifyWarning = (errMsg, timeOut = TIME_DEFAULT) =>
    toast.warning(errMsg, {
        autoClose: timeOut * 1000,
        closeOnClick: true,
    });

export const notifyInfo = (infoMsg, timeOut = TIME_DEFAULT) =>
    toast.info(infoMsg, {
        autoClose: timeOut * 1000,
        closeOnClick: true,
    });

export const notifySuccess = (successMsg, timeOut = TIME_DEFAULT) =>
    toast.success(successMsg, {
        autoClose: timeOut * 1000,
        closeOnClick: true,
    });
