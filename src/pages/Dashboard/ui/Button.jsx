import PropTypes from "prop-types";

Button.propTypes = {
    text: PropTypes.string,
    style: PropTypes.string,
    onButtonClick: PropTypes.func
};


export default function Button({ text ="add text", style="",
onButtonClick}) {
    return (
      <div>
        <button className={style} onClick={onButtonClick}>
            {text}
        </button>
        </div>
    );
}
