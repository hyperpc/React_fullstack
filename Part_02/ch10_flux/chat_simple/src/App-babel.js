//import './App.css';

function createStore(reducer, initialState){
    let state=initialState;
    let listeners = [];
  
    const getState = () => (state);
  
    const dispatch = (action) => {
      state = reducer(state, action);
      listeners.forEach(l=>l());// loop to invok the subscribed func
    };
  
    // subscribe the callback func
    const subscribe=(listener)=>{
      listeners.push(listener);
    }
  
    return {
      getState,
      dispatch,
      subscribe
    };
  }
  
  function reducer(state, action){
    if(action.type==='ADD_MSG'){
      return {
        messages:state.messages.concat(action.message)
      };
    }else if(action.type==='DEL_MSG'){
      return {
        messages:[
          ...state.messages.slice(0, action.index),
          ...state.messages.slice(action.index+1, state.messages.length)
        ]
      };
    }else{
      return state;
    }
  }
  
  const initState = {messages:[]};
  const store = createStore(reducer, initState);
  
  /* 10.8 */
  /*
  const addMsgAction1 = {
    type:"ADD_MSG",
    message:'How does it look, Neil?'
  }
  store.dispatch(addMsgAction1);
  const state_v1 = store.getState();
  
  const addMsgAction2 = {
    type:"ADD_MSG",
    message:'Looking good~'
  }
  store.dispatch(addMsgAction2);
  const state_v2 = store.getState();
  
  console.log('State v1:');
  console.log(state_v1);
  console.log('State v2:');
  console.log(state_v2);
  
  const delMsgAction1 = {
    type:"DEL_MSG",
    index:0
  }
  store.dispatch(delMsgAction1);
  const state_v3 = store.getState();
  console.log('State v3:');
  console.log(state_v3);
  */
  
  /* 10.9 */
  const listener = ()=>{
    console.log("Current state:");
    console.log(store.getState());
  }
  store.subscribe(listener);
  
  const addMsgAction3 = {
    type:"ADD_MSG",
    message:'How do you read?'
  }
  store.dispatch(addMsgAction3);
  
  const addMsgAction4 = {
    type:"ADD_MSG",
    message:'I read you loud and clear, Houston~'
  }
  store.dispatch(addMsgAction4);
  
  const delMsgAction2 = {
    type:"DEL_MSG",
    index:0
  }
  store.dispatch(delMsgAction2);
  
  const App = { createStore, reducer, initState }; // for tests
  export default App;
  