import MiniLoader from "../../ui/MiniLoader";

export default function Button({
    text = "add text",
    className = "bg-blue-500 text-white p-2 rounded-md outline-none font-semibold",
    loader,
    onButtonClick,
    disable = false
}) {
    return (
        <button
            className={className}
            disabled={disable}
            onClick={event => onButtonClick(event)}
        >
            {loader ? <MiniLoader /> : text}
        </button>
    );
}
