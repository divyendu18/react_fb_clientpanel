import {createStore, combineReducers, compose} from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import {reactReduxFirebase, firebaseReducer} from 'react-redux-firebase';
import {reduxFirestore,firestoreReducer} from 'redux-firestore';
//import { createFirestoreInstance } from 'redux-firestore'

  //reducer

  import notifyReducers from './reducers/notifyReducers';
  import settingsReducers from './reducers/settingsReducers';
  

  const firebaseConfig={
    apiKey: "AIzaSyBHdsW2TWSSZo54sMdx5sl_7Ra4bTG3fA4",
    authDomain: "clientpanel-f6e61.firebaseapp.com",
    databaseURL: "https://clientpanel-f6e61.firebaseio.com",
    projectId: "clientpanel-f6e61",
    storageBucket: "clientpanel-f6e61.appspot.com",
    messagingSenderId: "357712198581",
    appId: "1:357712198581:web:9de568d4747a895e36f7fc",
    measurementId: "G-EPSPFZCV8T"
  };

  // react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
     useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  }
  //firebse initialize

  firebase.initializeApp(firebaseConfig);
  const firestore = firebase.firestore();

 // const settings={/*your setting*/timestampInSnapshots:true};
   //  firestore.settings(settings);


  const createStoreWithFirebase= compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
  )(createStore);
//Add firebase to reducer
  const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer ,
    notify : notifyReducers,
    settings: settingsReducers
  });
  
  //check for settings in localStorage
  if(localStorage.getItem('settings')== null)
  {
    const defaultSettings={
      disableBalanceOnAdd: true,
    disableBalaneceOnEdit:false,
    allowRegistration:false
    }

    localStorage.setItem('settings',JSON.stringify(defaultSettings)); 
  }
  //create initialState={};
const initialState=JSON.parse(localStorage.getItem('settings'));
 
const store=createStoreWithFirebase(rootReducer,initialState,compose(
     reactReduxFirebase(firebase),
     window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f 
  )
  );

  export default store;
  //const store=createStoreWithFirebase(rootReducer,initialState,compose(

  ///window.__REDUX_DEVTOOLS_EXTENSIONS && window.__REDUX_DEVTOOLS_EXTENSION__() //It is not working
