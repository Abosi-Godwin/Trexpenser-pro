const Form = ({ children, submitFun, handleSubmitFun }) => {
    return (
        <form
            onSubmit={handleSubmitFun(submitFun)}
            className="p-3 border-t-2
    border-light-Background flex flex-col gap-3"
        >
            {children}
        </form>
    );
};

export default Form;
