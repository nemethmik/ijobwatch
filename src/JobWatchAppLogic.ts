import {uqTestConnection,uqQueryEmployeeByUserCode,uqQueryRunningJobsForUser,uqQueryResourcesForUser,
  uqQueryOpenJobsToStartForUserAndResource,getProductionOrder} from "./JobWatchAPI"
import {TActions,TToastFn,baseUrl,TJobWatchState} from "./JobWatchContext"
import { TProductionOrder } from "./ProductionOrder"
export function onConfigDoneClick(isHttps:boolean,hostName:string,portNumber:number,serviceName:string,
  setLoading:(loading:boolean)=>void,toast:TToastFn,
  goLogin:()=>void,dispatch:(action:TActions)=>void) {
  const url = baseUrl({hostName,serviceName,portNumber,isHttps})
  setLoading(true)
  uqTestConnection((data) => {//on Success
    console.log(data)
    toast(`Connection to ${url} successful`,2,"success","bottom")
    goLogin()
  },(errorText) => {//on Error
    console.log(errorText)
    toast(`${errorText}`,5,"danger","middle")
  }, async () => {//finally
    //await sleepAsync(1000) // To Demo some delay to let the spinner appear 
    setLoading(false)
    dispatch({type:"Conf",conf:{hostName,serviceName,portNumber,isHttps}})
  },url)
}
export function onLogin(setLoading:(loading:boolean)=>void,toast:TToastFn,
  dispatch:(action:TActions)=>void,userCode:string,autoLogin:boolean,state:TJobWatchState,
  goRunningJobPage:()=>void,goResourcesPage:()=>void) {
  setLoading(true)
  uqQueryEmployeeByUserCode((emp)=>{
    if(emp.length) {
      toast(`Hello ${emp[0].firstName} ${emp[0].lastName}`,1,"success","bottom")
      dispatch({type:"User",user:{userCode,autoLogin}})
      dispatch({type:"QueryEmployeeByUserCode",emp:emp[0]})
      // Check if there are running jobs for the user
      uqQueryRunningJobsForUser((job)=>{
        if(job.length) {
          toast(`Running job ${job[0].DocNum}/${job[0].SeqNum}/${job[0].ItemCode} found for ${emp[0].firstName} ${emp[0].lastName}`,1,"success","bottom")
          dispatch({type:"QueryRunningJobsForUser",job:job[0]})
          // Proceed forward to Running Job Page
          goRunningJobPage()
        } else {
          toast(`No running jobs for ${emp[0].firstName} ${emp[0].lastName}`,1,"success","bottom")
          //Query resources for the user to start a job
          uqQueryResourcesForUser((resources)=>{
            if(resources.length) {
              toast(`${resources.length} resources found to start job ${emp[0].firstName} ${emp[0].lastName}`,1,"success","bottom")
              dispatch({type:"QueryResourcesForUser",resources})
              // Open start job page
              goResourcesPage()
            } else {
              toast(`Wow, no resources found, no jobs to start`,5,"danger","middle")
            }
          },
          (errorText)=>toast(`${errorText}`,5,"danger","middle"),
          ()=>setLoading(false),baseUrl(state.conf),userCode)
        }
      },
      (errorText)=>toast(`${errorText}`,5,"danger","middle"),
      ()=>setLoading(false),baseUrl(state.conf),userCode)
    } else toast(`${userCode} login was rejected`,5,"danger","middle")  
  },
  (errorText)=>toast(`${errorText}`,5,"danger","middle"),
  ()=>setLoading(false),baseUrl(state.conf),userCode)
}
export function onResourceSelectedForOpenJobs(setLoading:(loading:boolean)=>void,toast:TToastFn,
  dispatch:(action:TActions)=>void,goStartJobPage:()=>void,resCode:string,state:TJobWatchState) {
  setLoading(true)
  uqQueryOpenJobsToStartForUserAndResource((jobs)=>{
    dispatch({type:"QueryOpenJobsToStartForUserAndResource",openJobs:jobs})
    if(jobs.length) {
      toast(`${jobs.length} open jobs found for resource ${resCode}`,1,"success","bottom")
      goStartJobPage()
    } else {
      toast(`No open jobs found for resource ${resCode}`,2,"warning","middle")
    }
  },(errorText)=>toast(errorText,4,"danger","middle"),()=>setLoading(false),baseUrl(state.conf),resCode,state.user.userCode)
}

export function onStopRunningJob(setLoading:(loading:boolean)=>void,toast:TToastFn,
  dispatch:(action:TActions)=>void,goQuantitiesPage:()=>void,docEntry:string,lineNum:string,state:TJobWatchState) {
  setLoading(true)
  getProductionOrder((prodOrder:TProductionOrder)=>{
    dispatch({type:"ProductionOrder",prodOrder})
    toast(`Production order found for ${docEntry}`,1,"success","bottom")
    goQuantitiesPage()
  },(errorText)=>toast(errorText,4,"danger","middle"),()=>setLoading(false),baseUrl(state.conf),parseInt(docEntry),6000)
}