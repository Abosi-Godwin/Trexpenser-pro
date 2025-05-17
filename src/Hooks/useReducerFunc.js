import { useReducer } from "react";

const reducerFunc = (state, action) => {
    switch (action.type) {
        case "UPDATE_FIELD":
            return { ...state, [action.payload.field]: action.payload.value };
        default:
            return { ...state };
    }
};

export const useReducerFunc = datas => {
    const [states, dispatch] = useReducer(reducerFunc, datas);

    const inputChange = (inputType, value) => {
        
        dispatch({
            type: "UPDATE_FIELD",
            payload: { field: inputType, value: value }
        });
    };
    return { states, inputChange };
};
