import React from "react"
import {RouteComponentProps} from "react-router"
import {NavContext,IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, 
  IonSegment, IonSegmentButton, IonLabel, IonIcon, IonList, IonBadge, IonSearchbar, IonItem, IonItemDivider} from "@ionic/react"
import {arrowBack,cog, people} from "ionicons/icons"
import {JobWatchContext,formatDate,formatTime,getFloat} from "../JobWatchContext"
// import { TQueryOpenJobsToStartForUserAndResource } from "../JobWatchAPI"
export const StartJobPage:React.FC<RouteComponentProps> = ({history}) => {
  const {state} = React.useContext(JobWatchContext)
  const { navigate } = React.useContext(NavContext);
  const goBackTo = (dest: string) => navigate(dest, "back") // Actually, no need for React.useCallback, at all
  const onJobSelected = (docEntry:string,lineNum:string) => {} 
  const openJobItems = () => {
    let runningDate: string = ""
    return state.openJobs?.map(j => {
      let optionalItemDividerForDate = (<></>)
      if(j.EffStartDate !== runningDate) {
        runningDate = j.EffStartDate
        optionalItemDividerForDate = (
          <IonItemDivider color="primary" key={j.DocEntry + "+" + j.LineNum}>
            {formatDate(runningDate)} {formatTime(j.BeginTime)}
          </IonItemDivider>
        )
      }
      return (
        <>
        {optionalItemDividerForDate}
        <IonItem color="secondary" button={true} key={j.DocEntry + "-" + j.LineNum} onClick={()=>onJobSelected(j.DocEntry,j.LineNum)}>
          <IonLabel>
            <h2>{j.Name}</h2>
            <p>{j.DocNum}/{j.SeqNum}/{j.VisOrder} ({j.ProdName})</p>
          </IonLabel>
          <IonBadge color="primary">{getFloat(j.OpenQty).toFixed(0)}</IonBadge>
          <IonIcon icon={(j.ResType === "M" ? cog : people)}/>
        </IonItem>
        </>     
      )    
    })
  }
  
  return (
    <IonPage>
      <IonHeader mode="ios">
        <IonToolbar><IonTitle>Start Job</IonTitle></IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSearchbar></IonSearchbar>
        <IonList>
          {openJobItems()}
        </IonList>
      </IonContent>
      <IonFooter mode="ios">
        <IonToolbar>
          <IonSegment>
            <IonSegmentButton onClick={()=>goBackTo("/resources")}>
              <IonIcon icon={arrowBack}/>
              <IonLabel>Resources</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton onClick={()=>goBackTo("/login")}>
              <IonIcon icon={people}/>
              <IonLabel>Logout</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  )
}
