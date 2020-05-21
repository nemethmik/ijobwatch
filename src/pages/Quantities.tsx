import React from "react"
import {RouteComponentProps} from "react-router"
import {IonPage,IonHeader,IonContent,IonToolbar,IonFooter,IonSegment,IonSegmentButton, IonTitle} from "@ionic/react"
import {} from "ionicons/icons"
import {JobWatchContext} from "../JobWatchContext"
type TQuantitiesPageProps = {
  completedQty: number,
  rejectedQty: number,
  reworkQty: number,
  hours:number,
}
export const QuantitiesPage: React.FC<RouteComponentProps> = ({history}) => {
  const {state,dispatch} = React.useContext(JobWatchContext)
  const [completedQty, setCompletedQty] = React.useState<number>(0)
  
  const wor1 = state.prodOrder?.bo.BOM.BO.WOR1.row.find(r => r.LineNum === state.job?.U_LineNum)
  return (
    <IonPage>
    <IonHeader mode="ios">
    <IonToolbar><IonTitle>Quantities</IonTitle></IonToolbar>
    </IonHeader>
    <IonContent>
      <p>
        {wor1?.ItemName}
      </p>
    </IonContent>
    </IonPage>
  )
}
