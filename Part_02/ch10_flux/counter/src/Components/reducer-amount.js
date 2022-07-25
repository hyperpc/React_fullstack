
function reducer(state, action){
    if(action.type==='INCREMENT'){
        return state+action.amount;
    }else if(action.type==='DECREMENT'){
        return state-action.amount;
    }else{
        return state;
    }
}

console.log("##### INCREMENT: (0,1,5)+2");
const incrementAction = { type:'INCREMENT', amount:2 };
console.log(reducer(0, incrementAction));
console.log(reducer(1, incrementAction));
console.log(reducer(5, incrementAction));

console.log("##### UNKNOWN: (5,8)+2");
const unknownAction = { type:'UNKNOWN', amount:2 };
console.log(reducer(5, unknownAction));
console.log(reducer(8, unknownAction));

console.log("##### DECREMENT: (10,9,5)+2");
const decrementAction = { type:'DECREMENT', amount:2 };
console.log(reducer(10, decrementAction));
console.log(reducer(9, decrementAction));
console.log(reducer(5, decrementAction));
