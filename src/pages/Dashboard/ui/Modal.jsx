function Modal({ children }) {
    return(<div className="modal w-screen h-screen bg-color-3 fixed top-0 left-0
            border px-4 flex justify-center items-center">{children}</div>);
}
export default Modal;