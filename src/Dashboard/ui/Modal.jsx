import { createPortal } from "react-dom";

function Modal({ children }) {
    return (
        <div className="modal fixed inset-0 z-50 flex items-center justify-center">
            {children}
        </div>
    );
}
export default Modal;
