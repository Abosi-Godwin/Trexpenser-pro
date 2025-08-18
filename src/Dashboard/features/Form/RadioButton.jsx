

function RadioButton({ register, error, watch, disable }) {
    return (
        <>
            <h3 className="font-bold"> Savings type?</h3>
            <div className="grid w-full gap-1 md:grid-cols-2">
                <div className="has-checked:bg-amber-600 flex items-start justify-between gap-3 border border-light-dividers rounded-md p-1.5">
                    <input
                        type="radio"
                        id="Manual"
                        name="savingsType"
                        value="Manual"
                        {...register("savingsType")}
                    />
                    <label
                        htmlFor="Manual"
                        className="
                         cursor-pointer
                        peer-checked:text-light-text w-full"
                    >
                        <div className="">
                            <h1 className=" text-lg font-semibold">
                                Manual <i className="text-sm">(Default)</i>
                            </h1>
                            <p className="w-full">Manually add some funds.</p>
                        </div>
                    </label>
                </div>

                <div className="has-checked:bg-amber-600 flex items-start justify-between gap-3 border border-light-dividers rounded-md p-1.5">
                    <input
                        type="radio"
                        id="automatic"
                        name="savingsType"
                        value="Automatic"
                        className=""
                        {...register("savingsType")}
                    />
                    <label
                        htmlFor="automatic"
                        className="cursor-pointer peer-checked:text-light-text w-full"
                    >
                        <div className="block">
                            <h1 className="w-full text-lg font-semibold">
                                Automatic
                            </h1>
                            <p className="w-full">
                                Automatically saved from income.
                            </p>
                        </div>
                    </label>
                </div>
            </div>
        </>
    );
}
export default RadioButton;
