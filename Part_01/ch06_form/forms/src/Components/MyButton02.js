import React from 'react';

class MyButton02 extends React.Component{
    onGreatClick = (evt) => {
        console.log('The user clicked btnGreat: great', evt);
    };
    onAmazingClick = (evt) => {
        console.log('The user clicked btnAmazing: amazing', evt);
    };
    onButton_Click = (evt) => {
        const btn = evt.target;
        console.log(`The user clicked ${btn.name}: ${btn.value}`);
    };
    render(){
        return(
            <div>
                <h1>What do you think of React?</h1>
                <button name='btnGreat' value='great' onClick={this.onButton_Click}>Great</button>
                <button name='btnAmazing' value='amazing' onClick={this.onButton_Click}>Amazing</button>
            </div>
        );
    }
}

export default MyButton02;