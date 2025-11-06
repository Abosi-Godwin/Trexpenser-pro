import { useSearchParams } from "react-router-dom";
import SortFiltInput from "../features/Form/SortFiltInput";

const Sorting = ({ options = [], label, labelFor }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortValue = searchParams.get("sortBy");

  const handleSort = (e) => {
    const sortMethod = e.target.value;

    const newParams = new URLSearchParams(searchParams);
    newParams.set("sortBy", sortMethod);
    setSearchParams(newParams);
  };

  return (
    <div>
      <SortFiltInput
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
