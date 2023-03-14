import { toast } from 'react-toastify';
export const notifyWarning = (errMsg) =>
    toast.warning(errMsg, {
        autoClose: 1.5 * 1000,
        closeOnClick: true,
    });

export const notifyInfo = (infoMsg) =>
    toast.info(infoMsg, {
        autoClose: 1.5 * 1000,
        closeOnClick: true,
    });

export const notifySuccess = (successMsg) =>
    toast.success(successMsg, {
        autoClose: 1.5 * 1000,
        closeOnClick: true,
    });
