import { ThemeContext } from "../Context/Theme";
import React from "react";

class ThemeToggleButton extends React.Component{
    render(){
        //The Theme Toggler Button receives not only the theme
        // but also a toggleTheme function from the context
        return (
            <ThemeContext.Consumer>
                {cxt=>(
                    <button onClick={cxt.toggleTheme}
                        style={{backgroundColor:cxt.theme.background}}>
                        Toggle Theme
                    </button>
                )}
            </ThemeContext.Consumer>
        );
    }
}

export default ThemeToggleButton;