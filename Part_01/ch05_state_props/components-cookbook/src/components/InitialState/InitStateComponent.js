import React from 'react';

class InitStateComponent extends React.Component{
    // ...
    constructor(props){
        super(props);

        this.state = {
            currentVal:1,
            currentUserName:'Ari'
        }
    }
    // ...
}

export default InitStateComponent;