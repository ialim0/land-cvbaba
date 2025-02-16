import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import FocusLock from 'react-focus-lock';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: React.ReactNode;
  titleClassName?: string;
  headerClassName?: string;
  closeButtonClassName?: string;
  ariaLabelledBy?: string;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  titleClassName,
  headerClassName,
  closeButtonClassName,
  ariaLabelledBy,
  className,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      let root = document.getElementById('modal-root');
      if (!root) {
        root = document.createElement('div');
        root.setAttribute('id', 'modal-root');
        document.body.appendChild(root);
      }
      setModalRoot(root);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeyDown);

        if (previousActiveElement.current) {
          previousActiveElement.current.focus();
        }
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={ariaLabelledBy}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <FocusLock>
        <div
          className={`relative z-50 w-full sm:w-[95%] md:w-[90%] lg:w-[800px] mx-auto ${className}`}
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white rounded-lg shadow-xl flex flex-col max-h-[90vh] sm:max-h-[85vh]">
            {/* Header Section */}
            {title && (
              <div
                className={`${
                  headerClassName ||
                  'bg-white px-4 sm:px-6 py-4 border-b border-gray-200 '
                } sticky top-0 z-10 rounded-t-lg`}
              >
                <div className="flex items-center justify-between">
                  <h2
                    id={ariaLabelledBy}
                    className={
                      titleClassName ||
                      'text-lg text-center sm:text-xl font-semibold text-gray-900'
                    }
                  >
                    {title}
                  </h2>
                  <button
                    onClick={onClose}
                    className={
                      closeButtonClassName ||
                      'text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full p-1 transition-colors'
                    }
                    aria-label="Close modal"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 sm:h-6 sm:w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Scrollable Content Section */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
              <div className="h-full">
                {children}
              </div>
            </div>
          </div>
        </div>
      </FocusLock>
    </div>,
    modalRoot
  );
};

export default Modal;