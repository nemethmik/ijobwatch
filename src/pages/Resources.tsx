import React from "react"
import {RouteComponentProps} from "react-router"
import {NavContext,IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, 
  IonSegment, IonSegmentButton, IonLabel, IonIcon, IonList, IonBadge, IonSearchbar, IonItem,
  IonLoading} from "@ionic/react"
import {arrowBack,cog,person, people} from "ionicons/icons"
import {JobWatchContext, baseUrl, toast} from "../JobWatchContext"
// import {uqQueryOpenJobsToStartForUserAndResource} from "../JobWatchAPI"
import {onResourceSelectedForOpenJobs} from "../JobWatchAppLogic"
export const ResourcesPage:React.FC<RouteComponentProps> = ({history}) => {
  const {state,dispatch} = React.useContext(JobWatchContext)
  const [loading,setLoading] = React.useState<boolean>(false)
  const { navigate } = React.useContext(NavContext);
  const goBackTo = (dest: string) => navigate(dest, "back") // Actually, no need for React.useCallback, at all
  const onResourseSelected = (resCode:string) => {
    onResourceSelectedForOpenJobs(setLoading,toast,dispatch,()=>history.push("/startjob"),resCode,state)
  } 
  return (
    <IonPage>
      <IonHeader mode="ios">
        <IonToolbar><IonTitle>Resources</IonTitle></IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLoading message="Logging in ..." duration={0} isOpen={loading}/>
        <IonSearchbar></IonSearchbar>
        <IonList>
          {
            state.resources?.map(r => (
              <IonItem color="secondary" button={true} key={r.ResCode} onClick={()=>onResourseSelected(r.ResCode)}>
                <IonLabel>{r.ResName}</IonLabel>
                <IonBadge color="primary">{r.OpenJobs}</IonBadge>
                <IonIcon icon={(r.ResType === "M" ? cog : people)}/>
              </IonItem>   
            )
          )}
        </IonList>
      </IonContent>
      <IonFooter mode="ios">
        <IonToolbar>
          <IonSegment>
            <IonSegmentButton onClick={()=>goBackTo("/login")}>
              <IonIcon icon={arrowBack}/>
              <IonLabel>Logout</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  )
}