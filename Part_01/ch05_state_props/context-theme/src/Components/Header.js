import { ThemeContext } from "../Context/Theme";
import logo from '../logo.svg';
import React from 'react';

export default class Header extends React.Component{
    render(){
        return(
            <ThemeContext.Consumer>
                {({theme, toggleTheme}) =>(
                    <header className="App-header"
                        style={{backgroundColor:theme.background}} >
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="app-title" style={{color:theme.foreground}}>
                            Welcome to React
                        </h1>
                    </header>
                )}
            </ThemeContext.Consumer>);
    }
};