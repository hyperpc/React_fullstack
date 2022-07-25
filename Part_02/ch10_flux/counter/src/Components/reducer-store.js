
function reducer(state, action){
    if(action.type==='INCREMENT'){
        return state+action.amount;
    }else if(action.type==='DECREMENT'){
        return state-action.amount;
    }else{
        return state;
    }
}

function createStore(reducer){
    let state=0;

    const getState = ()=>(state);

    const dispatch = (action)=>{
        state=reducer(state, action);
    };

    return {
        getState,
        dispatch
    };
}
const store = createStore(reducer);

console.log("##### INCREMENT: ");
const incrementAction = { type:'INCREMENT', amount:2 };
//console.log(reducer(0, incrementAction));
//console.log(reducer(1, incrementAction));
//console.log(reducer(5, incrementAction));
store.dispatch(incrementAction);
console.log(store.getState());
store.dispatch(incrementAction);
console.log(store.getState());

console.log("##### UNKNOWN: ");
const unknownAction = { type:'UNKNOWN', amount:2 };
//console.log(reducer(5, unknownAction));
//console.log(reducer(8, unknownAction));
store.dispatch(unknownAction);
console.log(store.getState());
store.dispatch(unknownAction);
console.log(store.getState());

console.log("##### DECREMENT: ");
const decrementAction = { type:'DECREMENT', amount:2 };
//console.log(reducer(10, decrementAction));
//console.log(reducer(9, decrementAction));
//console.log(reducer(5, decrementAction));
store.dispatch(decrementAction);
console.log(store.getState());
store.dispatch(decrementAction);
console.log(store.getState());
