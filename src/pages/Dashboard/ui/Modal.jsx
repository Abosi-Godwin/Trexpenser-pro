function Modal({ children }) {
    return (
        <div
            className="modal w-screen min-w-screen h-screen min-h-screen fixed top-0 left-0 flex justify-center items-center z-50"
        >
            {children}
        </div>
    );
}
export default Modal;
