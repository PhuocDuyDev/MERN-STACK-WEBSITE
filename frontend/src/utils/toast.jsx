import { toast } from 'react-toastify';
import { TIME_SHOW_TOAST_DEFAULT } from '../const';

export const notifyWarning = (errMsg, timeOut = TIME_SHOW_TOAST_DEFAULT) =>
    toast.warning(errMsg, {
        autoClose: timeOut * 1000,
        closeOnClick: true,
    });

export const notifyInfo = (infoMsg, timeOut = TIME_SHOW_TOAST_DEFAULT) =>
    toast.info(infoMsg, {
        autoClose: timeOut * 1000,
        closeOnClick: true,
    });

export const notifySuccess = (successMsg, timeOut = TIME_SHOW_TOAST_DEFAULT) =>
    toast.success(successMsg, {
        autoClose: timeOut * 1000,
        closeOnClick: true,
    });
