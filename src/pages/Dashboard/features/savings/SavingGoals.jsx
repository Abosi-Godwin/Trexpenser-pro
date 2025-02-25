import { useSelector } from "react-redux";
//import { decrement, increment } from "./counterSlice";

function SavingGoals() {
    const savings = useSelector(state => state.savings);
    console.log(savings);
    return <div className="bg-color-2 py-6 px-2"></div>;
}

export default SavingGoals;
