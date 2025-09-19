import { useSearchParams } from "react-router-dom";
import SelectInput from "../features/Form/SelectInput";

const Sorting = ({ options = [], label, labelFor }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortValue = searchParams.get("sortBy");

    const handleSort = e => {
        const sortMethod = e.target.value;
        
        const newParams = new URLSearchParams(searchParams);
        newParams.set("sortBy", sortMethod);
        setSearchParams(newParams);
    };

    return (
        <div>
            <SelectInput
                options={options}
                selected={sortValue}
                label={label}
                labelFor={labelFor}
                disable={false}
                onHandleChange={handleSort}
            />
        </div>
    );
};

export default Sorting;
