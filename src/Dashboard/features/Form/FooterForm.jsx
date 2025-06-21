import { useReducer } from "react";
const initialState = 0;

function reducerFunc(state, action) {
    switch (action.type) {
        case "incre":
            return +state + 1;
        case "decre":
            if (+state === 0) {
                return;
            } else {
                return +state - 1;
            }
            break;
        case "setNum":
            return Number(action.payLoad);
        case "reset":
            return initialState;
        default:
            return "Unkwon input";
    }
}
const btnStyle =
    "bg-color-2 p-2 rounded-md text-2xl text-color-8 uppercase font-bold";
export default function FooterForm() {
    const [number, dispatch] = useReducer(reducerFunc, initialState);

    return (
        <div>
            <h1 className="text-4xl text-color-2 font-bold">
                {number > 0 ? number : "0"}
            </h1>

            <div>
                <label htmlFor="userName" className="capitalize">
                    Your name:
                </label>
                <input
                    id="userName"
                    type="text"
                    placeholder="What's your name?"
                    onChange={e =>
                        dispatch({
                            type: "setNum",
                            payLoad: e.target.value
                        })
                    }
                    onBlur={e => (e.target.value = "")}
                    className="w-full
                text-color-8 bg-color-2 border-none outline-none p-2 rounded
                placeholder:text-color-4"
                />
            </div>
            <div
                className="w-full flex items-center justify-center gap-4
                bg-color-8 my-2 py-4"
            >
                <button
                    className={btnStyle}
                    onClick={() => dispatch({ type: "incre" })}
                >
                    Add
                </button>

                <button
                    className={btnStyle}
                    onClick={() => dispatch({ type: "decre" })}
                >
                    Minus
                </button>
            </div>
        </div>
    );
}
