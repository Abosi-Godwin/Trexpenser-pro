import { useSearchParams } from "react-router-dom";
import SortFiltInput from "../features/Form/SortFiltInput";
const Filtering = ({ options = [], label, labelFor }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterValue = searchParams.get("filterBy");

  const handleFilter = (e) => {
    const filterMethod = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    newParams.set("filterBy", filterMethod);
    setSearchParams(newParams);
  };

  return (
    <SortFiltInput
      options={options}
      selected={filterValue}
      label={label}
      labelFor={labelFor}
      onHandleChange={handleFilter}
    />
  );
};

export default Filtering;
