import Modal from "./Modal";
import Button from "../features/Form/Button";
const EmptySummary = ({ onCloseModal }) => {
  console.log(onCloseModal);
    return (
        <Modal>
            <div className="p-3 bg-white rounded-md w-4/5">
                <p>
                    Nothing to summarize yet. Add transactions, set goals, or
                    create budgets to generate a summary.
                </p>
                <div className="flex justify-between items-center py-4">
                    <Button />
                    <Button />
                </div>
            </div>
        </Modal>
    );
};

export default EmptySummary;
