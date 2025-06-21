import InputLabel from "./InputLabel";

const TextArea = ({ label, register, error }) => {
    return (
        <div>
            <InputLabel label={label} inputType="textarea" />
            <textarea
                id={label}
                name={label}
                rows="3"
                cols="20"
                
                placeholder="Describe your budget..."
                className="bg-light-sectionBackground border-none outline-none p-2 w-full rounded-md"
                {...register(label)}
            ></textarea>
        </div>
    );
};
export default TextArea;
