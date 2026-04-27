 import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import Button from "../features/Form/Button";

const EmptySummary = ({ onCloseModal }) => {
  const navigate = useNavigate();

  return (
    <Modal>
      <div className="p-5 bg-white dark:bg-dark-background rounded-md w-4/5 
        max-w-md flex flex-col gap-4">
        
        <div>
          <h2 className="font-bold text-lg mb-1">Nothing to summarize yet</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Add at least one transaction, savings goal, or budget to generate
            your AI financial summary.
          </p>
        </div>

        <div className="flex justify-between items-center gap-3">
          <Button
            text="Close"
            onButtonClick={onCloseModal}
            className="flex-1 bg-light-sectionBackground dark:bg-dark-sectionBackground
              rounded-md p-2 font-bold text-sm"
          />
          <Button
            text="Add transaction"
            onButtonClick={() => {
              onCloseModal();
              navigate("/transactions");
            }}
            className="flex-1 bg-light-primaryCTA text-white rounded-md 
              p-2 font-bold text-sm hover:bg-light-secondaryAccent 
              transition-colors"
          />
        </div>
      </div>
    </Modal>
  );
};

export default EmptySummary;