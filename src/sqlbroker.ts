import axios from 'axios'
type NoPasswordConnection = {
  Profile: string,
  CompanyDB: string,
  Server: string,
  DbUserName: string,
  UserName: string,
  DbServerType: string,
  AdoNetUser: string
}
export type TSQLResult = {
  statusCode: number,
  rollbackOnly: boolean,
  errorCode: number,
  errorText: string,
  errorStackTrace: string,
  execMillis: number,
  columns: [],
  data: [{[key:string]:number | string | Date | boolean}],
  rawXml: string,
  connection: NoPasswordConnection,
  SQL: string,
  userQuery: string,
  extendedUQ: boolean
}
// async function userQueryAsync(onSuccess:(data:SQLResult)=>void, onError:(errorText:string)=>void,
//   baseUrl:string,category:string,uqName:string,pars:string,profile:string) {
//   try {
//     const url = `${baseUrl}/UQ/${category}/${uqName}?${(profile ? 'profile=' + profile : '')}${(pars ? '&' + pars : '')}`
//     console.log(url)
//     const response = await fetch(url)
//     if(response.ok) {
//       const sqlResult:SQLResult = await response.json()
//       if(sqlResult.errorCode === 0) onSuccess(sqlResult)
//       else onError(sqlResult.errorText)
//     } else if(response.status === 400) { // BAD REQUEST, no problem, this is thrown by SQL Broker
//       const sqlResult:SQLResult = await response.json()
//       onError(sqlResult.errorText)
//     } else {
//       console.log(response)
//       onError(response.statusText)
//     }
//   } catch(error) {
//     console.log(error)
//     onError("" + error)
//   } 
// } 
// function timeoutPromise<T>(ms:number, promise:Promise<T>):Promise<T> {
//   return new Promise<T>((resolve, reject) => {
//     const timeoutId = setTimeout(() => {reject(new Error("timeout"))}, ms);
//     promise.then(
//       (res) => {
//         clearTimeout(timeoutId);
//         resolve(res);
//       },
//       (err) => {
//         clearTimeout(timeoutId);
//         reject(err);
//       }
//     );
//   })
// }
// async function userQueryTimeoutAsync(onSuccess:(data:SQLResult)=>void, onError:(errorText:string)=>void,
//   baseUrl:string,category:string,uqName:string,pars:string,profile:string,timeout:number) {
//     try { 
//       await timeoutPromise(timeout, 
//         userQueryAsync(onSuccess, onError,baseUrl,category,uqName,pars,profile));
//     } catch(error) {
//       onError("" + error)
//     }
// }
export function userQueryAxios(onSuccess:(data:TSQLResult)=>void, onError:(errorText:string)=>void, onFinally:()=>void,
  baseUrl:string,category:string,uqName:string,pars:string,profile:string,timeout:number) {
  try {
    let queryStr = `${profile ? 'profile=' + profile : ''}`
    if(pars) {
      if(queryStr) queryStr += "&" + pars
      else queryStr = pars
    }
    const url = `${baseUrl}UQ/${category}/${uqName}?${queryStr}`
    console.log(url)
    axios(url,{timeout}).then(response => {
      console.log(response);
      onSuccess(response.data)
    }).catch(error => {
      if(error.response) {
        //console.log("Response has Data",error.response.data);
        if(error.response.status === 400 && error.response.data.errorText) {
          onError(error.response.data.errorText)
        } else  if(error.response.data.Message) { //Invalid request, for example
          onError(`${error.response.data.Message} for ${url}`)
        } else {
          onError("" + error.response.data)
        } 
      } else {
        console.log("Response Error",error);      
        onError("" + error)
      }
    }).finally(() => onFinally())
  } catch(error) {
    //console.log(error)
    onError("" + error)
  } finally {onFinally()}
} 
export type TBOResult = {
  "jobNumber": string,
  "statusCode": string,
  "errorCode": string,
  "errorText": string,
  "errorStackTrace": string,
  "found": string,
  "id": string,
  "execMillis": number,
  "bo": {
      "BOM": {
          "BO": {
              "AdmInfo": {
                  "Object": string
              },
              [key:string]:any,
          }
      }
  },
  "rawXml": string,
  "xmlSchema": string,
  "connection": {
      "Profile": string,
      "CompanyDB": string,
      "Server": string,
      "DbUserName": string,
      "UserName": string,
      "DbServerType": string,
      "AdoNetUser": string
  },
  "reqType": string,
  "boName": string
}
export function getBOAxios(onSuccess:(data:TBOResult)=>void, onError:(errorText:string)=>void, onFinally:()=>void,
  baseUrl:string,boName:string,boId:string,profile:string,timeout:number) {
  try {
    let queryStr = `${profile ? 'profile=' + profile : ''}`
    const url = `${baseUrl}BO/${boName}/${boId}?${queryStr}`
    console.log(url)
    axios(url,{timeout}).then(response => {
      console.log(response);
      onSuccess(response.data)
    }).catch(error => {
      if(error.response) {
        //console.log("Response has Data",error.response.data);
        if(error.response.status === 400 && error.response.data.errorText) {
          onError(error.response.data.errorText)
        } else  if(error.response.data.Message) { //Invalid request, for example
          onError(`${error.response.data.Message} for ${url}`)
        } else {
          onError("" + error.response.data)
        } 
      } else {
        console.log("Response Error",error);      
        onError("" + error)
      }
    }).finally(() => onFinally())
  } catch(error) {
    //console.log(error)
    onError("" + error)
  } finally {onFinally()}
} 

