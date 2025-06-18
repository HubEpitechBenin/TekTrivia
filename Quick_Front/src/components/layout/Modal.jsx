import { useEffect } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  // Empêche le scroll de la page quand le modal est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      ></div>
      <div
        className="relative bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 p-6 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;