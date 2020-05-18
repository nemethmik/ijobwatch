import React from "react"
import {RouteComponentProps} from "react-router-dom"
import {IonPage,IonHeader,IonTitle,IonContent,IonFooter,IonSegment,IonSegmentButton, IonToolbar, IonLoading, IonItem, IonLabel, IonInput, IonToggle, IonIcon} from "@ionic/react"
import {arrowBack,arrowForward} from "ionicons/icons"
import {NavContext} from "@ionic/react"
import {JobWatchContext,baseUrl, toast} from "../JobWatchContext"
// import {uqQueryEmployeeByUserCode,uqQueryRunningJobsForUser,uqQueryResourcesForUser} from "../JobWatchAPI"
import {onLogin} from "../JobWatchAppLogic"
export const LoginPage: React.FC<RouteComponentProps> = ({history}) => {
  const {state,dispatch} = React.useContext(JobWatchContext)
  const [userCode,setUserCode] = React.useState<string>("maria")
  const [password,setPassword] = React.useState<string>("")
  const [autoLogin,setAutoLogin] = React.useState<boolean>(false)
  const [loading,setLoading] = React.useState<boolean>(false)
  // From https://stackoverflow.com/a/60615930
  // Call this function when required to redirect with the back animation
  // const goBackTo = React.useCallback((dest:string) => navigate(dest, "back"),[navigate])
  const {navigate} = React.useContext(NavContext);
  const goBackTo = (dest:string) => navigate(dest, "back") // Actually, no need for React.useCallback, at all
  return (
    <IonPage>
      <IonHeader mode="ios">
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Logging in ..." duration={0} isOpen={loading}/>
      <IonContent className="ion-padding-start ion-padding-end">
        <form>
          <IonItem className="ion-padding-start ion-padding-end">
            <IonLabel>User Name</IonLabel>
            <IonInput type="text" onIonChange={e=>setUserCode(e.detail.value!)} value={userCode} clearInput={true}></IonInput>
          </IonItem>
          <IonItem className="ion-padding-start ion-padding-end">
            <IonLabel>Password</IonLabel>
            <IonInput type="password" onIonChange={e=>setPassword(e.detail.value!)} value={password} placeholder="1234"/>
          </IonItem>
          <IonItem className="ion-padding-start ion-padding-end">
            <IonLabel>Auto-Login</IonLabel>
            <IonToggle checked={autoLogin} onIonChange={e=>{setAutoLogin(e.detail.checked)}}></IonToggle>
          </IonItem>
        </form>
        <p style={{textAlign:"center"}}>
          {baseUrl(state.conf)}
        </p>
      </IonContent>
      <IonFooter mode="ios">
        <IonToolbar>
          <IonSegment>
            <IonSegmentButton onClick={() => goBackTo("/home")}>
                <IonIcon icon={arrowBack}></IonIcon>
                <IonLabel>Conf</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton onClick={() => {
              onLogin(setLoading,toast,dispatch,userCode,autoLogin,state,
                ()=>history.push("/runningjob"),()=>history.push("/resources"))
            }}>
              <IonIcon icon={arrowForward}></IonIcon>
              <IonLabel>Login</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  )
}