import React, { useEffect } from "react"
import { attachProps } from "@ionic/react/dist/types/components/utils"
type TTimerProps = {
  start:number,
  formatter:(seconds:number)=>string,
}
export const Timer: React.FC<TTimerProps> = (props) => {
  // console.log("Timer rendered")
  const [secondsElapsed,setSecondsElapsed] = React.useState<number>(props.start)
  useEffect(()=>{
    // console.log("Timer useEffect Called")
    const timerID = setInterval(() => {
      // console.log("Seconds elapsed", secondsElapsed)
      // setSecondsElapsed(secondsElapsed + 1)
      setSecondsElapsed((se) => se + 1)
    }, 1000 );
    return function() {
      // console.log("Interval cleared")
      clearInterval(timerID)
    }
  },[])
   return (
     <div>
       {/* {new Date(secondsElapsed * 1000).toISOString().substr(11, 8)} */}
       {props.formatter(secondsElapsed)}
     </div>
   )
 }
