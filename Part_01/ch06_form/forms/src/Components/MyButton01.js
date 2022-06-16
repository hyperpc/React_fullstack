import React from 'react';

class MyButton01 extends React.Component{
    onGreatClick = (evt) => {
        console.log('The user clicked btnGreat: great', evt);
    };
    onAmazingClick = (evt) => {
        console.log('The user clicked btnAmazing: amazing', evt);
    };
    render(){
        return(
            <div>
                <h1>What do you think of React?</h1>
                <button name='btnGreat' value='great' onClick={this.onGreatClick}>Great</button>
                <button name='btnAmazing' value='amazing' onClick={this.onAmazingClick}>Amazing</button>
            </div>
        );
    }
}

export default MyButton01;