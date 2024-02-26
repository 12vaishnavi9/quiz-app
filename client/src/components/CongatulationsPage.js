import React from "react";
import { useAnswer } from "../context/Answer";
const [answers,setAnswers]=useAnswer();

const CongratulationsPage=()=>{
    useEffect(()=>{
        console.log(answers)
    })
    return(
        <>
        <div>
            Congratulations! Click below button to see results
        </div>
        <div>
            <button onClick>Results</button>
        </div>
        </>
    )
}

export default CongratulationsPage;