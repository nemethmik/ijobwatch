# Job Watch Mobile Shop Floor Workshop Job Reporting Application for SAP Business One (IONIC Version)

This is a modern remake of the brilliant JQuery Mobile version of JobWatch.

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