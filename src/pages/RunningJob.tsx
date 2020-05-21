import React from "react"
import { RouteComponentProps } from "react-router"
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, IonSegment,
  IonSegmentButton, IonLabel, IonIcon, NavContext, IonGrid, IonRow, IonCol, IonItem, IonItemDivider
} from "@ionic/react"
import { arrowForward, person } from "ionicons/icons"
import {JobWatchContext,minuteDiff,sapDTToDate,formatMinDiff,formatTime,getFloat,formatSecondsDiff} from "../JobWatchContext"
import {Timer} from "../components/Timer"
export const RunningJobPage: React.FC<RouteComponentProps> = ({ history }) => {
  const {state} = React.useContext(JobWatchContext)
  const { navigate } = React.useContext(NavContext);
  const goBackTo = (dest: string) => navigate(dest, "back") // Actually, no need for React.useCallback, at all
  function statusText(statusCode?:string):string | undefined {
    switch(statusCode) {
      case "I": return "In Progress"
      case "P": return "Planned"
      case "C": return "Completed"
      default: return statusCode
    }
  }
  const startDateTime = sapDTToDate(state.job?.Recontact,state.job?.BeginTime)
  const runningMinutes = minuteDiff(startDateTime,new Date())
  const runningTimeText = formatMinDiff(runningMinutes) + ` (${(runningMinutes/60).toFixed(2)}h)`
  return (
    <IonPage>
      <IonHeader mode="ios">
        <IonToolbar>
          <IonTitle>Running Job</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem color="primary">
                {state.job?.RSName}
              </IonItem>
              <IonItemDivider>Open Qty: {getFloat(state.job?.OpenQty).toFixed(0)} EA</IonItemDivider>
              <IonItem color="primary">
                {state.job?.ProdName}
              </IonItem>
              <IonItemDivider>{state.job?.DocNum} / {state.job?.SeqNum} / {state.job?.VisOrder}</IonItemDivider>
              <IonItem color="primary">
                {state.job?.ItemName}
              </IonItem>
              <IonItemDivider>{statusText(state.job?.Status)}</IonItemDivider>
            </IonCol>
            <IonCol>
                <p>Started</p>
                <IonItem color="success">
                  <p>{startDateTime?.toISOString().substring(0,10)}</p>
                </IonItem>
                <IonItem color="success">
                  <h1>{formatTime(state.job?.BeginTime)}</h1>
                </IonItem>
                <p>Running</p>
                {/* <IonItem color="danger"><h1>{runningTimeText}</h1></IonItem> */}
                {/* <IonItem color="danger"><h1><Timer start={runningMinutes * 60} 
                formatter={(seconds)=>new Date(seconds * 1000).toISOString().substr(11, 8)}/></h1></IonItem> */}
                <IonItem color="danger"><h1><Timer start={runningMinutes * 60} 
                formatter={(seconds)=>formatSecondsDiff(seconds)}/></h1></IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonFooter mode="ios">
        <IonToolbar>
          <IonSegment>
            <IonSegmentButton onClick={() => goBackTo("/login")}>
              <IonIcon icon={person} />
              <IonLabel>Logout</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton onClick={()=>history.push("/resources")}>
              <IonIcon icon={arrowForward} />
              <IonLabel>Stop</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  )
} 