import { createContext, useContext } from 'react';
import { toast } from 'react-toastify';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const show = (message, type = 'info') => {
    const options = {
      position: 'bottom-right',
      autoClose: 3500,
      hideProgressBar: false,
      pauseOnHover: true,
      theme: 'dark',
    };

    const toastType = ['success', 'error', 'info', 'warning'].includes(type) ? type : 'info';
    toast[toastType](message, options);
  };

  return <ToastContext.Provider value={{ show }}>{children}</ToastContext.Provider>;
};

export const useToast = () => useContext(ToastContext);
