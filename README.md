# Job Watch Mobile Shop Floor Workshop Job Reporting Application for SAP Business One (IONIC Version)

This is a modern remake of the brilliant JQuery Mobile version of JobWatch.

## IONIC Tools to Make IOS and Android Apps
- **npm install -E cordova-plugin-ionic**
- **ionic/npx build** the command to create the actual deployable **build** directory. The **public** directory in an Ionic project is the source folder for the static elements including index.html 
- **ionic/npx cap add ios | android** to create IOS and Android project folders
- **ionic/npx cap open ios | android** opens Xcode or Android Studio
-- **ionic/npx cap sync ios | android** to rebuild the IOS/Android project from the Ionic sources

## Tools
- IONIC User Interface library and deployment machinery
- React JSX and front end framework
- TypeScrip front-end programming language
- SQL for User Queries
- SQL Broker as generic business logic service

## Module Dependency
- **sqlbroker.ts** uses Axios, and defines SQL Broker types
- **JobWatchAPI.ts** uses sqlbroker.ts to perform convenient service calls for the client application
- **JobWatchContext.tsx** has two major parts
  - JobWatchContext and JobWatchContextProvider (used in App.tsx)
  - JobWatchReducer for application level state management, it uses data types from JobWatchAPI
- **JobWatchAppLogic.ts** uses the JobWatch API functions and some dispatch-relevant type definitions from JobWatchContext
- Home.tsx, Login.tsx, Resources.tsx, RunningJob.tsx, StartJob.tsx use JobWatchAppLogic and JobWatchContext

## IONIC and SQL Broker Alternatives
Since the application logic is cleanly separated from the UI technology, any UI library could be used instead of IONIC. For example, Material UI could be an excellent alternative.
React and TypeScript are fundamental parts of the application, they are the backbone.

SQL Broker could be easily replaced, too, just implement JobWatchAPI functions and you are done. 

## React Optimization Experimenting with memo, useMemo, useReducer
Totally meaningless to fuss about these optimization techniques.
Whatever you do it's almost impossible to reduce significantly the number of re-renderings of React components. This is characteristic of reactive applications. The application programmer declares the applications triggers state cahnges with useState or useReducer, but the rest is the job of the React framework which is basically an application state and life-cycle management framework.
The good news is that React and all other similar frameworks do it really fine with their behind-scene virtual-DOM-based rendering optimization machinery.
If you think it's not optimal it's better to drop the framework completely, when you start thinking of using functions like useMemo, memoization, useCallback, you'd better stop using that framework completely and go back to framework-less classic web development.

## Literature References
- (Harry Wolff)[https://hswolff.com/blog/why-i-love-usereducer/] has an excellent series about react reducer hooks
  - useReducer is a React-standard alternative of useState, but gives some additional complexity, but that could be completely fine. A reducer could be defined for page level or the entire application level. Anyway, if you reach a point to factor out the application logic, which is a mediator between the UI (IonPage) and the backend business logic API services, then definitely using the reducer pattern is the "standard" way to go, since this is well known and every React programmer would understand immediately.
  - However, when you are about to use tool like (Immer, as suggested by Harry Wolff)[https://hswolff.com/blog/level-up-usereducer-with-immer/], then you are about to rethink if your application architecture is optimal.
  - (useContext could be used with reducers)[https://hswolff.com/blog/how-to-usecontext-with-usereducer], too, but it is not needed at all when the app structure has only one context provider root.
  On the other hand, using context is really harmless, and you can even create a context for each page, sou you can have an application level global context and a subcontext for every page, this could be a quite meaningful architecture to show off your skills and deep-knowledge of React.

- (Ken C. Dodds)[https://kentcdodds.com/blog/super-simple-start-to-react] has a number of excellent articles about React programming and specifically reducers and (contexts)[https://kentcdodds.com/blog/how-to-use-react-context-effectively].
 
