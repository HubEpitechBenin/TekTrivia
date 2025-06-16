import { X } from 'lucide-react';

const Modal = ({ show, onClose, title, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative">
        <div className="relative flex items-center justify-center bg-red-600 mb-4 h-12">
          {/* Title */}
          <h3 className="text-xl font-semibold text-white">{title}</h3>

          {/* Close Button */}
          <button
            className="absolute right-4 text-gray-200 hover:text-white"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
