import { useContext, createContext } from "react";

const ToastContext = createContext();

const useToast = () => {
  const context = useContext(ToastContext);
  if (!context)
    throw new Error("useToast must be used within ToastContext.Provider");
  return context;
};

export default useToast;
