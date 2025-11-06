const SortFiltInput = ({ options, labelFor, label, onHandleChange, selected = "" }) => {
  return (
    <div>
      <label
        htmlFor={labelFor}
        className="font-bold capitalize"
      >
        {label}
      </label>
      <br />
      <select
        name="filter"
        id="filter"
        onChange={onHandleChange}
        className="bg-light-sectionBackground border-none outline-none
                p-2 rounded w-full
                  dark:bg-dark-sectionBackground dark:text-dark-text"
      >
        {options.map((option, index) => (
          <option
            value={option.value}
            key={index}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
export default SortFiltInput;
