import { UserContext } from "../Context/AppUser";
import { ThemeContext } from "../Context/Theme";
import React from 'react';

export class Body extends React.Component{
    render(){
        return(
            <ThemeContext.Consumer>
                {theme =>(
                    <header className="App-header"
                        style={{backgroundColor:theme.background}} >
                        <UserContext.Consumer>
                            <h1>{user => (user?'Welcome back':'Welcome')}</h1>
                        </UserContext.Consumer>
                    </header>
                )}
            </ThemeContext.Consumer>
        );
    }
};