//import Transaction from "../features/transactions/Transaction";

import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel
} from "@tanstack/react-table";

const Table = ({ children }) => {
    const tableInstance = useReactTable({
     //   columns,
     //   data,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel()
    });

    return (
        <div className="overflow-scroll p-3 rounded-md">
            <div
                className="p-2 w-[480px] rounded-md divide-y-2
            divide-light-sectionBackground dark:divide-dark-sectionBackground
            md:w-full"
            >
                <div className="p-2 rounded flex justtify-center items-center gap-2">
                    <div
                        className="grid grid-cols-transactions items-center
                    gap-3 justify-between w-[90%] pl-12 h-8"
                    >
                        <p>Source</p>

                        <div className="flex justify-between">
                            <p>Amount</p>
                            <p>Date</p>
                        </div>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Table;
