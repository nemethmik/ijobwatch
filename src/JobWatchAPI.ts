import {userQueryAxios, TSQLResult, TBOResult, getBOAxios} from "./sqlbroker"
import {TProductionOrder} from "./ProductionOrder"
let PROFILE:string = ""
export function setProfile(profile:string) {PROFILE = profile}
export function uqTestConnection(onSuccess:(data:TSQLResult)=>void, onError:(errorText:string)=>void, onFinally:()=>void,
  baseUrl:string,timeout:number = 6000) {
  userQueryAxios(onSuccess,onError,onFinally,baseUrl,"JobWatch","TestConnection","",PROFILE,timeout)
}
const QueryEmployeeByUserCodeSample: TQueryEmployeeByUserCode = {
  "Code": 4,
  "userId": 22,
  "empID": 4,
  "lastName": "Bridi",
  "firstName": "Maria",
  "USER_CODE": "maria",
}
export type TQueryEmployeeByUserCode = {
  Code: number,
  userId: number,
  empID: number,
  lastName: string,
  firstName: string,
  USER_CODE: string,
}
export function uqQueryEmployeeByUserCode(onSuccess:(empDetails:[TQueryEmployeeByUserCode])=>void, onError:(errorText:string)=>void, onFinally:()=>void,
  baseUrl:string,userCode:string,timeout:number = 6000) {
  const axSuccess = (sqlResult:TSQLResult) => {
    const missingField = validateSQLResultAgainstSample(sqlResult,QueryEmployeeByUserCodeSample)
    if(!missingField) onSuccess((sqlResult.data as [TQueryEmployeeByUserCode]))
    else onError(`${missingField} is missing from response data`)
  }  
  userQueryAxios(axSuccess,onError,onFinally,baseUrl,"JobWatch","QueryEmployeeByUserCode",`p0=${userCode}`,PROFILE,timeout)
}
const QueryRunningJobsForUserSample: TQueryRunningJobsForUser = {
    "RSName": "Disk Assembly",
    "BeginTime": "1422",
    "Recontact": "5/17/2020 12:00:00 AM",
    "SeqNum": "2",
    "ProdName": "External HD",
    "OpenQty": "11.000000",
    "ItemName": "Assembly Machine",
    "StageId": "2",
    "Status": "I",
    "Action": "T",
    "ClgCode": "66",
    "DocEntry": "161",
    "DocNum": "161",
    "U_LineNum": "4",
    "USER_CODE": "maria",
    "USERID": "22",
    "ItemCode": "R300005",
    "Comments": "",
    "VisOrder": "7"
}
export type TQueryRunningJobsForUser = {
  RSName: string,
  BeginTime: string,
  Recontact: string,
  SeqNum: string,
  ProdName: string,
  OpenQty: string,
  ItemName: string,
  StageId: string,
  Status: string,
  Action: string,
  ClgCode: string,
  DocEntry: string,
  DocNum: string,
  U_LineNum: string,
  USER_CODE: string,
  USERID: string,
  ItemCode: string,
  Comments: string,
  VisOrder: string,
}
export function uqQueryRunningJobsForUser(onSuccess:(runningJobDetails:[TQueryRunningJobsForUser])=>void, onError:(errorText:string)=>void, onFinally:()=>void,
  baseUrl:string,userCode:string,timeout:number = 6000) {
  const axSuccess = (sqlResult:TSQLResult) => {
    const missingField = validateSQLResultAgainstSample(sqlResult,QueryRunningJobsForUserSample)
    if(!missingField) onSuccess((sqlResult.data as [TQueryRunningJobsForUser]))
    else onError(`${missingField} is missing from response data`)
  }  
  userQueryAxios(axSuccess,onError,onFinally,baseUrl,"JobWatch","QueryRunningJobsForUser",`p0=${userCode}`,PROFILE,timeout)
}
const QueryResourcesForUserSample:TQueryResourcesForUser = {
  "ResCode": "R300004",
  "ResName": "Testing Machine",
  "ResType": "M",
  "OpenJobs": 1
}
export type TQueryResourcesForUser = {
  ResCode: string,
  ResName: string,
  ResType: string,
  OpenJobs: number,
}
export function uqQueryResourcesForUser(onSuccess:(data:[TQueryResourcesForUser])=>void, onError:(errorText:string)=>void, onFinally:()=>void,
  baseUrl:string,userCode:string,timeout:number = 6000) {
  const axSuccess = (sqlResult:TSQLResult) => {
    const missingField = validateSQLResultAgainstSample(sqlResult,QueryResourcesForUserSample)
    if(!missingField) onSuccess((sqlResult.data as [TQueryResourcesForUser]))
    else onError(`${missingField} is missing from response data`)
  }  
  userQueryAxios(axSuccess,onError,onFinally,baseUrl,"JobWatch","QueryResourcesForUser",`p0=${userCode}`,PROFILE,timeout)
}
function validateSQLResultAgainstSample(sqlResult:TSQLResult,sample:{[k:string]:any}):string | null {
  if(sqlResult.data && sqlResult.data.length) {
    for(const k in sample) {
      if(!sqlResult.data[0].hasOwnProperty(k)) return k;
    }
  }
  return null;
}

const QueryOpenJobsToStartForUserAndResourceSample: TQueryOpenJobsToStartForUserAndResource = {
  "EffStartDate": "4/30/2020 12:00:00 AM",
  "ProdName": "32GB Memory Server",
  "WOStatus": "R",
  "RSStatus": "I",
  "ItemCode": "R300005",
  "DocEntry": "155",
  "DocNum": "155",
  "LineNum": "4",
  "VisOrder": "3",
  "StartDate": "4/30/2020 12:00:00 AM",
  "BeginTime": "1259",
  "OpenQty": "0.000000",
  "TimeToComplete": "-147.450000",
  "StageId": "1",
  "Name": "Cabinet Assembly (Rework)",
  "SeqNum": "1",
  "ItemName": "Assembly Machine",
  "ResType": "M"
}
export type TQueryOpenJobsToStartForUserAndResource = {
  EffStartDate: string,
  ProdName: string,
  WOStatus: string,
  RSStatus: string,
  ItemCode: string,
  DocEntry: string,
  DocNum: string,
  LineNum: string,
  VisOrder: string,
  StartDate: string,
  BeginTime: string,
  OpenQty: string,
  TimeToComplete: string,
  StageId: string,
  Name: string,
  SeqNum: string,
  ItemName: string,
  ResType: string
}
export function uqQueryOpenJobsToStartForUserAndResource(onSuccess:(data:[TQueryOpenJobsToStartForUserAndResource])=>void, onError:(errorText:string)=>void, onFinally:()=>void,
  baseUrl:string,resCode:string,userCode:string,timeout:number = 6000) {
  const axSuccess = (sqlResult:TSQLResult) => {
    const missingField = validateSQLResultAgainstSample(sqlResult,QueryOpenJobsToStartForUserAndResourceSample)
    if(!missingField) onSuccess((sqlResult.data as [TQueryOpenJobsToStartForUserAndResource]))
    else onError(`${missingField} is missing from response data`)
  }  
  userQueryAxios(axSuccess,onError,onFinally,baseUrl,"JobWatch","QueryOpenJobsToStartForUserAndResource",`p0=${resCode}&p1=${userCode}`,PROFILE,timeout)
}

export function getProductionOrder(onSuccess:(data:TProductionOrder)=>void, onError:(errorText:string)=>void, onFinally:()=>void,
baseUrl:string,docNum:number,timeout:number) {
  const axSuccess = (boResult:TBOResult) => {
    if(boResult.bo.BOM.BO.OWOR) onSuccess(boResult as TProductionOrder)
    else onError("No OWOR found in BOM")
  }
  getBOAxios(axSuccess, onError, onFinally,baseUrl,"ProductionOrders",docNum.toString(),PROFILE,timeout)
}