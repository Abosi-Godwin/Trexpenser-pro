import { FaPen } from "react-icons/fa6";
import { FaDeleteLeft } from "react-icons/fa6";

function EdithAndDelBtn({ onDataEdit, onDataDelete, data }) {
    return (
        <div className="flex flex-col justify-between gap-2 p-4">
            <button
                className="bg-color-8 text-color-3 p-2  rounded"
                onClick={() => onDataEdit(data)}
            >
                {<FaPen />}
            </button>
            <button
                className="bg-red-500 text-color-2 p-2  rounded"
                onClick={() => onDataDelete(data)}
            >
                {<FaDeleteLeft />}
            </button>
        </div>
    );
}
export default EdithAndDelBtn;
