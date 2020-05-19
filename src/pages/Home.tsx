import React from "react"
import {RouteComponentProps} from "react-router-dom"
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonSegment,
  IonSegmentButton,IonLabel,IonItem,IonInput,IonToggle,IonCard,IonIcon, IonLoading } from "@ionic/react"
import {checkmarkDone, arrowBack,} from "ionicons/icons"
import {JobWatchContext,toast} from "../JobWatchContext"
// import {uqTestConnection} from "../JobWatchAPI"
import {onConfigDoneClick} from "../JobWatchAppLogic"

type THomeState = {
  hostName:string,
  serviceName:string,
  portNumber:number,
  isHttps:boolean,
  // [k:string]:any,
}
type THomeAction = {
  type:"Home",
  payload: {
    hostName?:string,
    serviceName?:string,
    portNumber?:number,
    isHttps?:boolean,
    // [k:string]:any,
  }
}
function homeReducer(state:THomeState,action:THomeAction):THomeState{
  switch(action.type) {
    case "Home": {
      const newState = {...state}
      //@ts-ignore //TODO This is to prevent unwanted checking for open ended object typee definitions
      for(const k in action.payload) if(typeof action.payload[k] !== "undefined") newState[k] = action.payload[k]
      // if(typeof action.hostName === "string") newState.hostName = action.hostName
      // if(typeof action.serviceName === "string") newState.serviceName = action.serviceName
      // if(typeof action.portNumber === "number") newState.portNumber = action.portNumber
      // if(typeof action.isHttps === "boolean") newState.isHttps = action.isHttps
      return newState
    }
    default: return state
  }
}

let renderCount = 0
//HOME/Configurations Page
export const Home: React.FC<RouteComponentProps> = ({history}) => {
  console.log("Home",++renderCount)
  // BEGIN useReducer version
    const [state,homeDispatch] = React.useReducer(homeReducer,{hostName:"mikisurface",serviceName:"t11sqlbroker",portNumber:80,isHttps:false})
    const setHttps = (on:boolean) => homeDispatch({type:"Home",payload:{isHttps:on,portNumber:(on?443:80)}})
    const setHostName = (hn:string) => homeDispatch({type:"Home",payload:{hostName:hn}})
    const setServiceName = (sn:string) => homeDispatch({type:"Home",payload:{serviceName:sn}})
    const setPortNumber = (pn:number) => homeDispatch({type:"Home",payload:{portNumber:pn}})
  // END useReducer version
  // BEGIN useState version
    // const [hostName,setHostName] = React.useState<string>("mikisurface")
    // const [serviceName,setServiceName] = React.useState<string>("t11sqlbroker")
    // const [portNumber,setPortNumber] = React.useState<number>(80)
    // const [isHttps,setHttps] = React.useState<boolean>(false)
  // END useState version
  const {dispatch} = React.useContext(JobWatchContext)
  const [loading,setLoading] = React.useState<boolean>(false)
  // This was an experiment to see any performance improvement when using eparate context for state and dispatch
  // but, no improvement, the same number of render call
  // const dispatch = React.useContext(JobWatchDispatchContext)
  return (
    <IonPage>
      <IonHeader mode="ios">
        <IonToolbar>
          <IonTitle>Config</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Processing..." duration={0} isOpen={loading}/>
      <IonContent className="ion-padding-start ion-padding-end">
        <IonCard  className="ion-padding-start ion-padding-end">
          <IonItem>
            <IonLabel>HTTPS</IonLabel>
            <IonToggle checked={state.isHttps} onIonChange={e => {
              setHttps(e.detail.checked)
              //Not needed for useReducer version, BUT UNCOMMENT for useState version
              // setPortNumber(e.detail.checked ? 443 : 80)
            }}/>
          </IonItem>
        </IonCard>
        <form> {/* enterkeyhint is ignored by mobile browsers, but Android recognizes it */}
          <IonItem className="ion-padding-start ion-padding-end">
            <IonLabel position="fixed">Host</IonLabel>
            <IonInput clearInput={true} style={{textAlign:"center"}} value={state.hostName} enterkeyhint="next" placeholder="192.168.1.182"
              onIonChange={e => setHostName(e.detail.value!)}/>
          </IonItem>
          <IonItem className="ion-padding-start ion-padding-end">
            <IonLabel position="fixed">API</IonLabel>
            <IonInput clearInput={true} style={{textAlign:"center"}} value={state.serviceName} enterkeyhint="next" 
              onIonChange={e => setServiceName(e.detail.value!)}/>
          </IonItem>
          <IonItem className="ion-padding-start ion-padding-end">
            <IonLabel position="fixed">Port Number</IonLabel>
            <IonInput type="number" clearInput={true} style={{textAlign:"center"}} step="1" value={state.portNumber} enterkeyhint="go" 
            onIonChange={e => setPortNumber(parseInt(e.detail.value!))}></IonInput>
          </IonItem>
        </form>
      </IonContent>
      <IonFooter mode="ios">
        <IonToolbar>
          <IonSegment onIonChange={e => console.log('Segment selected', e.detail.value)}>
            <IonSegmentButton>
              <IonIcon icon={arrowBack} /><IonLabel>Exit</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton onClick={() => {
              onConfigDoneClick(state.isHttps,state.hostName,state.portNumber,state.serviceName,setLoading,toast,()=>history.push("/login"),dispatch)
              // onConfigDoneClick(isHttps,hostName,portNumber,serviceName,setLoading,toast,()=>history.push("/login"),dispatch)
            }}>
              <IonIcon icon={checkmarkDone} /><IonLabel>Done</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>        
      </IonFooter>
    </IonPage>
  )
}
export const MemoizedHome = React.memo(Home)