import RecentItem from "./RecentItem";
import { RecentItemMenuCard } from "./RecentItemMenu";

const Table = ({ datas }) => {
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
  
                    {datas.map((transaction, index) => 
                                <RecentItem
                                    transaction={transaction}
                                    key={index}
                                />

          
                    )}
                
            </div>
        </div>
    );
};

export default Table;
