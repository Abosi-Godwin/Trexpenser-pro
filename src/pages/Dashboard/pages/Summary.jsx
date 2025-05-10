//import { useAuth } from "../../../contexts/AuthContext";
import {getInsightsAPI} from "../../../Utils/CustomMethods"
const Summary = () => {
    // const { insights } = useAuth();
    //  console.log(insights);
    const handleClick = () => {
        console.log(5);
        getInsightsAPI("What is enroute?")
    };
    return (
        <>
            <button onClick={handleClick}>Get insight</button>
            <h1>Summary page</h1>
        </>
    );
};
export default Summary;
