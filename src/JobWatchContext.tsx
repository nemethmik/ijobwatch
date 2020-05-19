import React from "react"
import {TQueryEmployeeByUserCode,TQueryResourcesForUser,TQueryRunningJobsForUser,TQueryOpenJobsToStartForUserAndResource} from "./JobWatchAPI"
//State type definitions
export type TConf = {
  isHttps: boolean,
  hostName: string,
  serviceName: string,
  portNumber: number,
}
export type TUser = {
  userCode:string,
  autoLogin?:boolean,
}
export type TJobWatchState = {
  readonly conf: TConf,
  readonly user: TUser,
  readonly emp?: TQueryEmployeeByUserCode,
  readonly resources?: [TQueryResourcesForUser],
  readonly job?: TQueryRunningJobsForUser,
  readonly openJobs?: [TQueryOpenJobsToStartForUserAndResource]
}
// Actions
//TQueryEmployeeByUserCode,TQueryResourcesForUser,TQueryRunningJobsForUser,TQueryOpenJobsToStartForUserAndResource
type TActionConf = {readonly type:"Conf", readonly conf: TConf}
type TActionUser = {readonly type:"User", readonly user: TUser}
type TActionQueryEmployeeByUserCode = {readonly type:"QueryEmployeeByUserCode", readonly emp: TQueryEmployeeByUserCode}
type TActionQueryResourcesForUser = {readonly type:"QueryResourcesForUser", readonly resources: [TQueryResourcesForUser]}
type TActionQueryRunningJobsForUser = {readonly type:"QueryRunningJobsForUser", readonly job: TQueryRunningJobsForUser}
type TActionQueryOpenJobsToStartForUserAndResource = {readonly type:"QueryOpenJobsToStartForUserAndResource", readonly openJobs: [TQueryOpenJobsToStartForUserAndResource]}
export type TActions = TActionConf | TActionUser | 
  TActionQueryEmployeeByUserCode | TActionQueryResourcesForUser | TActionQueryRunningJobsForUser |
  TActionQueryOpenJobsToStartForUserAndResource
//The reducer
function jobWatchReducer(state:TJobWatchState,action:TActions):TJobWatchState {
  switch(action.type) {
    case "Conf": return {...state, conf: action.conf}
    case "User": return {...state, user: action.user}
    case "QueryEmployeeByUserCode": return {...state, emp: action.emp}
    case "QueryResourcesForUser": return {...state, resources: action.resources}
    case "QueryRunningJobsForUser": return {...state, job: action.job}
    case "QueryOpenJobsToStartForUserAndResource": return {...state, openJobs: action.openJobs}
    default: neverReached(action) // Very nifty application of never 
  }
  return state
}
function neverReached(never:never){}
export const baseUrl = (conf:TConf):string => `${conf.isHttps ? "https" : "http"}://${conf.hostName}${(conf.portNumber === 80 || conf.portNumber === 443) ? "" : ":" + conf.portNumber}/${conf.serviceName}/Api/`

export type TJobWatchContext = {
  state: TJobWatchState,
  dispatch: React.Dispatch<TActions>
} 
//Initial value is mandatory, but I suppress the error, the real initial value is set
//by the context provider when the reducer is in place
export const JobWatchContext = React.createContext<TJobWatchContext>(({} as TJobWatchContext))
// export const JobWatchStateContext = React.createContext<TJobWatchState>(({} as TJobWatchState))
// export const JobWatchDispatchContext = React.createContext<React.Dispatch<TActions>>(({} as React.Dispatch<TActions>))
export const JobWatchContextProvider:React.FC = (props) => {
  const [state,dispatch] = React.useReducer<React.Reducer<TJobWatchState,TActions>>(jobWatchReducer,{
    conf: {
      isHttps: false,
      hostName: "mikisurface",
      serviceName: "t11sqlbroker",
      portNumber: 80,
    },
    user: {userCode:"maria"}
  }) 
  // This from https://hswolff.com/blog/how-to-usecontext-with-usereducer didn't make any improvement
  //const contextValue = React.useMemo(() => ({ state, dispatch }), [state, dispatch])
  // For nested context providers, see https://kentcdodds.com/blog/how-to-use-react-context-effectively#the-custom-provider-component
  // I found zero benefit from applying these optimization techniques
  return (
    // <JobWatchDispatchContext.Provider value={dispatch}>
    //   <JobWatchStateContext.Provider value={state}>
        <JobWatchContext.Provider value={{ state, dispatch }}>
          {props.children}
        </JobWatchContext.Provider>
    //   </JobWatchStateContext.Provider>
    // </JobWatchDispatchContext.Provider>    
  )
} 
// A couple of utilities
export type TToastFn = (msg:string,seconds:number,color:"danger" | "success" | "warning",position:"middle" | "bottom")=>Promise<void>
export async function toast(msg:string,seconds:number,color:"danger" | "success" | "warning",position:"middle" | "bottom") {
  const toast = document.createElement('ion-toast')
  toast.message = msg
  toast.duration = seconds * 1000
  toast.position = position
  toast.color = color
  document.body.appendChild(toast)
  return toast.present()
}
export async function sleepAsync(ms:number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
export function ifNaN(n:any,replacementValue:number):number {
  return isNaN(n) ? replacementValue : n
}

export function getFloat(anything:any) {
  return ifNaN(parseFloat(anything),0)
}

export function formatDate(dt:string) {
  const d = new Date(dt)
  return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
}
export function formatTime(intTime:number | string | undefined):string {
  if(intTime) {
    let t = "0000" + intTime
    t = t.substring(t.length - 4,t.length)
    t = t.substring(0,2) + ":" + t.substring(2,4)
    //console.log(t)
    return t
  } else return ""
}
export function sapTimeToMinutes(sapTime:number | string | undefined):number {
  let t = "0000" + sapTime
  t = t.substring(t.length - 4,t.length)
  const h = parseInt(t.substring(0,2))
  const m = parseInt(t.substring(2,4))
  return (h * 60) + m
}
export function minuteDiff(date1:Date | undefined,date2:Date | undefined):number {
  if(date1 && date2) {
  const diffMillis = Math.abs(date2.getTime() - date1.getTime())
  return Math.ceil(diffMillis/(1000 * 60))
  } else return 0
}
export function formatMinDiff(minutes:number) {
  let quot = "0" + Math.floor(minutes/60)
  quot = quot.substring(quot.length - 2,quot.length) 
  let rem = "0"+ minutes % 60
  rem = rem.substring(rem.length - 2,rem.length) 
  return `${quot}:${rem}` 
}
export function sapDTToDate(dateStr:string | Date | undefined,timeStr:number | string | undefined):Date | undefined {
  if(dateStr) {
    const sd = new Date(dateStr)
    const bt = sapTimeToMinutes(timeStr)
    sd.setMinutes(bt)
    return sd
  } else return undefined
}