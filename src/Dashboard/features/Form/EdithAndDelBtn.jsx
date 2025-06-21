import { FaPen } from "react-icons/fa6";
import { FaDeleteLeft } from "react-icons/fa6";

function EdithAndDelBtn({ onDataEdit, onDataDelete, data }) {
    return (
        <div className="flex flex-col justify-between gap-2 p-4">
            <button className="p-2 bg-light-sectionBackground rounded" onClick={() => onDataEdit(data)}>
                {<FaPen />}
            </button>
            <button
                className="p-2 bg-light-sectionBackground rounded"
                onClick={() => onDataDelete(data)}
            >
                {<FaDeleteLeft />}
            </button>
        </div>
    );
}
export default EdithAndDelBtn;
