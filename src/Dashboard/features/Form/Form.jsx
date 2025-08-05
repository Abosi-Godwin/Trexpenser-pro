const Form = ({ children, submit }) => {
    return <form onSubmit={submit}   className="p-3 border-t-2
    border-light-Background flex flex-col gap-3">{children}</form>;
};

export default Form;
