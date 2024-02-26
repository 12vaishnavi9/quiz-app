import React,{useEffect, useRef, useState} from "react";
import "../styles/Timer.css";

const Timer=({whenTimeUp})=>{
    const [counter,setCounter]=useState(0);
    const [progress,setProgress]=useState(0);
    const intervalRef=useRef();

    useEffect(()=>{
        intervalRef.current=setInterval(()=>{
            setCounter((curr)=>curr+1);
        },1000);

        return()=>clearInterval(intervalRef.current);
    },[])

    useEffect(()=>{
        setProgress(100*(counter/2));
        if(counter===2){
            clearInterval(intervalRef.current);
            setTimeout(()=>{
                whenTimeUp();
            })
        }
    },[counter])
    return(
        <div className="loader">
        <div className="progress"
        style={{
            width:`${progress}%`,
            backgroundColor:`${
                progress<40?'lightgreen'
                :progress<70?'orange'
                :'red'
            }`
        }}>
        </div>
        </div>
    )
}

export default Timer;