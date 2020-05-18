import React from "react"
import {RouteComponentProps} from "react-router-dom"
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonSegment,
  IonSegmentButton,IonLabel,IonItem,IonInput,IonToggle,IonCard,IonIcon, IonLoading } from "@ionic/react"
import {checkmarkDone, arrowBack,} from "ionicons/icons"
import {JobWatchContext,toast} from "../JobWatchContext"
// import {uqTestConnection} from "../JobWatchAPI"
import {onConfigDoneClick} from "../JobWatchAppLogic"
//HOME/Configurations Page
export const Home: React.FC<RouteComponentProps> = ({history}) => {
  const [hostName,setHostName] = React.useState<string>("mikisurface")
  const [serviceName,setServiceName] = React.useState<string>("t11sqlbroker")
  const [portNumber,setPortNumber] = React.useState<number>(80)
  const [isHttps,setHttps] = React.useState<boolean>(false)
  const [loading,setLoading] = React.useState<boolean>(false)
  const {state,dispatch} = React.useContext(JobWatchContext)
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
            <IonToggle checked={isHttps} onIonChange={e => {
              setHttps(e.detail.checked)
              setPortNumber(e.detail.checked ? 443 : 80)
              // console.log(e.detail.checked)
            }}/>
          </IonItem>
        </IonCard>
        <form> {/* enterkeyhint is ignored by mobile browsers, but Android recognizes it */}
          <IonItem className="ion-padding-start ion-padding-end">
            <IonLabel position="fixed">Host</IonLabel>
            <IonInput clearInput={true} style={{textAlign:"center"}} value={hostName} enterkeyhint="next" placeholder="192.168.1.182"
              onIonChange={e => setHostName(e.detail.value!)}/>
          </IonItem>
          <IonItem className="ion-padding-start ion-padding-end">
            <IonLabel position="fixed">API</IonLabel>
            <IonInput clearInput={true} style={{textAlign:"center"}} value={serviceName} enterkeyhint="next" 
              onIonChange={e => setServiceName(e.detail.value!)}/>
          </IonItem>
          <IonItem className="ion-padding-start ion-padding-end">
            <IonLabel position="fixed">Port Number</IonLabel>
            <IonInput type="number" clearInput={true} style={{textAlign:"center"}} step="1" value={portNumber} enterkeyhint="go" 
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
              onConfigDoneClick(isHttps,hostName,portNumber,serviceName,setLoading,
                toast,()=>history.push("/login"),dispatch)
            }}>
              <IonIcon icon={checkmarkDone} /><IonLabel>Done</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>        
      </IonFooter>
    </IonPage>
  )
}