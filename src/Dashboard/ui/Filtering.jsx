import { useSearchParams } from "react-router-dom";
import SelectInput from "../features/Form/SelectInput";

const Filtering = ({ options = [], label, labelFor }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const filterValue = searchParams.get("filterBy");
    
    
    const handleFilter = e => {
        const filterMethod = e.target.value;
        const newParams = new URLSearchParams(searchParams);
        newParams.set("filterBy", filterMethod);
        setSearchParams(newParams);
    };

    return (
        <div>
            <SelectInput
                options={options}
                selected={filterValue}
                label={label}
                labelFor={labelFor}
                disable={false}
                onHandleChange={handleFilter}
            />
        </div>
    );
};

export default Filtering;
