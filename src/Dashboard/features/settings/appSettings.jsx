// AppSettings.jsx
import { useForm } from "react-hook-form";
import Button from "../Form/Button";
import Input from "../Form/Input";

const currencyOptions = [
  { label: "Nigerian Naira (₦)", value: "NGN" },
  { label: "US Dollar ($)", value: "USD" },
  { label: "British Pound (£)", value: "GBP" },
  { label: "Euro (€)", value: "EUR" },
];

const dateFormatOptions = [
  { label: "DD/MM/YYYY", value: "dd/MM/yyyy" },
  { label: "MM/DD/YYYY", value: "MM/dd/yyyy" },
  { label: "YYYY-MM-DD", value: "yyyy-MM-dd" },
];

const defaultPageOptions = [
  { label: "Dashboard", value: "/" },
  { label: "Transactions", value: "/transactions" },
  { label: "Savings", value: "/savings" },
  { label: "Budgets", value: "/budgets" },
];

const AppSettings = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    mode: "all",
    defaultValues: {
      currency: "NGN",
      dateFormat: "dd/MM/yyyy",
      defaultPage: "/",
      darkMode: false,
    },
  });

  const onSubmit = (data) => {
    // TODO: persist to Supabase user metadata or localStorage
    console.log("App settings saved:", data);
    reset(data);
  };

  return (
    <div className="bg-light-cardBackground dark:bg-dark-cardBackground
      dark:text-dark-text rounded-md p-3 flex flex-col gap-4">

      <h2 className="text-2xl font-bold">App Settings</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

        {/* Currency */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-sm">Currency</label>
          <select
            {...register("currency")}
            className="p-2 rounded-md border border-light-dividers 
              dark:border-dark-dividers bg-light-sectionBackground 
              dark:bg-dark-sectionBackground outline-none"
          >
            {currencyOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date format */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-sm">Date Format</label>
          <select
            {...register("dateFormat")}
            className="p-2 rounded-md border border-light-dividers 
              dark:border-dark-dividers bg-light-sectionBackground 
              dark:bg-dark-sectionBackground outline-none"
          >
            {dateFormatOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Default landing page */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-sm">Default Page After Login</label>
          <select
            {...register("defaultPage")}
            className="p-2 rounded-md border border-light-dividers 
              dark:border-dark-dividers bg-light-sectionBackground 
              dark:bg-dark-sectionBackground outline-none"
          >
            {defaultPageOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Dark mode */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-sm">Dark Mode</p>
            <p className="text-xs text-light-subtext dark:text-dark-subtext">
              Switch between light and dark theme
            </p>
          </div>
          <input
            type="checkbox"
            {...register("darkMode")}
            className="w-5 h-5 accent-light-primaryCTA cursor-pointer"
          />
        </div>

        <hr className="border-light-dividers dark:border-dark-dividers" />

        <div className="flex gap-3">
          <Button
            text="Save settings"
            type="submit"
            disabled={!isDirty}
            className="bg-light-primaryCTA text-white px-4 py-2 
              rounded-md font-bold text-sm disabled:opacity-50"
          />
          <Button
            text="Reset"
            type="button"
            onButtonClick={() => reset()}
            disabled={!isDirty}
            className="bg-light-sectionBackground dark:bg-dark-sectionBackground
              px-4 py-2 rounded-md font-bold text-sm disabled:opacity-50"
          />
        </div>
      </form>
    </div>
  );
};

export default AppSettings;