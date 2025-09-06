const Form = ({ children, submitFun, handleSubmitFun }) => {
    return (
        <form
            onSubmit={handleSubmitFun(submitFun)}
            className="flex flex-col gap-1.5"
        >
            {children}
        </form>
    );
};

export default Form;
 