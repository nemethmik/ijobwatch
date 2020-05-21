import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {Home} from './pages/Home'
import {LoginPage} from './pages/Login'
import {RunningJobPage} from "./pages/RunningJob"
import {ResourcesPage} from "./pages/Resources"
import {StartJobPage} from "./pages/StartJob"
import {QuantitiesPage} from "./pages/Quantities"
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css' // Set the theme to dark to consume less power on mobile devices
import {JobWatchContextProvider} from "./JobWatchContext"

const App: React.FC = () => (
  <IonApp>
    <JobWatchContextProvider>
      <IonReactRouter>
        <IonRouterOutlet>
          {/** React.useMemo(() => Home,[Home]) was a disaster, MemoizedHome was called the same number of times*/}
          <Route path="/home" component={Home} exact={true} />
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route path="/login" component={LoginPage} exact={true} />
          <Route path="/runningjob" component={RunningJobPage} exact={true} />
          <Route path="/resources" component={ResourcesPage} exact={true} />
          <Route path="/startjob" component={StartJobPage} exact={true} />
          <Route path="/quantities" component={QuantitiesPage} exact={true} />
        </IonRouterOutlet>
      </IonReactRouter>
    </JobWatchContextProvider>
  </IonApp>
)
export default App;
